<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBookReviews } from './useBookReviews'
import { fromNow } from '../utils/time'
import { replaceEmojiTokens } from '../utils/emoji'
import { MAX_REVIEW_STARS } from '../api/comment'
import type { BookComment, CommentReply } from '../types'

const props = defineProps<{ bookId: string }>()

/** 首次切到书评 tab 时才真正请求，避免进详情页就多打一次接口 */
const started = ref(false)

const {
    comments, tags, scoreText, scoreCount, total, hasMore, sort, tagId,
    loading, loadingMore, error, loaded, load, loadMore, setSort, setTag,
    userComment, replyStates, stateOf, toggleReplies, loadMoreReplies, expandSubReplies,
    like, dislike, actionError, submitting, submitOk, submit,
} = useBookReviews(props.bookId)

/** 打分草稿：0 表示还没打过；默认沿用已有评分 */
const draftStars = ref(0)
const draftText = ref('')
const formOpen = ref(false)

const hasTags = computed(() => tags.value.length > 0)

function start(): void {
    if (started.value) return
    started.value = true
    void load(true)
}

defineExpose({ start })

onMounted(() => {
    if (started.value) void load(true)
})

function openForm(): void {
    formOpen.value = !formOpen.value
    if (formOpen.value && !draftStars.value) {
        draftStars.value = userComment.value ? Math.round(userComment.value.score / 2) : 5
    }
}

async function doSubmit(): Promise<void> {
    if (submitting.value) return
    const ok = await submit(draftStars.value || 5, draftText.value)
    if (ok) {
        draftText.value = ''
        formOpen.value = false
    }
}

function replyState(comment: BookComment) {
    return stateOf(comment.id)
}

/** 回复列表挂在响应式对象上，模板里取一次避免重复写入 */
function repliesOf(comment: BookComment): CommentReply[] {
    return replyStates.value[comment.id]?.replies ?? []
}
</script>

<template>
<div class="fqa-rv">
    <!-- 顶部：评分摘要 + 排序 + 写书评 -->
    <div class="fqa-rv-bar">
        <div class="fqa-rv-summary">
            <span v-if="scoreText" class="fqa-rv-score">{{ scoreText }}</span>
            <span v-else-if="scoreCount" class="fqa-rv-score">{{ scoreCount }} 人点评</span>
            <span class="fqa-rv-total">共 {{ total }} 条书评</span>
        </div>
        <div class="fqa-rv-actions">
            <div class="fqa-rv-sort">
                <button type="button" :class="['fqa-rv-sort-btn', { on: sort === 1 }]" @click="setSort(1)">最热</button>
                <button type="button" :class="['fqa-rv-sort-btn', { on: sort === 3 }]" @click="setSort(3)">最新</button>
            </div>
            <button type="button" class="fqa-rv-write" @click="openForm">
                {{ userComment ? '修改我的书评' : '写书评' }}
            </button>
        </div>
    </div>

    <!-- 评分 / 写书评表单 -->
    <div v-if="formOpen" class="fqa-rv-form">
        <div class="fqa-rv-stars" role="radiogroup" aria-label="评分">
            <button
                v-for="n in MAX_REVIEW_STARS"
                :key="n"
                type="button"
                class="fqa-rv-star"
                :class="{ on: n <= draftStars }"
                :aria-label="`${n} 星`"
                @click="draftStars = n"
            >★</button>
            <span class="fqa-rv-star-tip">{{ draftStars }} 星</span>
        </div>
        <textarea
            v-model="draftText"
            class="fqa-rv-input"
            rows="4"
            maxlength="1000"
            placeholder="说说这本书哪里好看（留空则只打分）"
        ></textarea>
        <div class="fqa-rv-form-foot">
            <span v-if="actionError" class="fqa-rv-err">{{ actionError }}</span>
            <span v-else-if="submitOk" class="fqa-rv-ok">已提交</span>
            <button type="button" class="fqa-rv-submit" :disabled="submitting" @click="doSubmit">
                {{ submitting ? '提交中…' : '提交' }}
            </button>
        </div>
    </div>

    <!-- 我已有的评分 / 书评 -->
    <div v-if="userComment" class="fqa-rv-mine">
        <div class="fqa-rv-mine-hd">
            <span class="fqa-rv-mine-label">我的书评</span>
            <span class="fqa-rv-mine-stars">{{ '★'.repeat(Math.round(userComment.score / 2)) }}</span>
        </div>
        <p v-if="userComment.text" class="fqa-rv-text">{{ replaceEmojiTokens(userComment.text) }}</p>
    </div>

    <!-- 标签筛选 -->
    <div v-if="hasTags" class="fqa-rv-tags">
        <button
            type="button"
            :class="['fqa-rv-tag', { on: !tagId }]"
            @click="setTag('')"
        >全部</button>
        <button
            v-for="t in tags"
            :key="t.tag_id"
            type="button"
            :class="['fqa-rv-tag', { on: tagId === t.tag_id }]"
            @click="setTag(t.tag_id)"
        >{{ t.tag_name }}<em v-if="t.count">{{ t.count }}</em></button>
    </div>

    <!-- 状态 -->
    <div v-if="loading && !comments.length" class="fqa-rv-state">加载中…</div>
    <div v-else-if="error" class="fqa-rv-state fqa-rv-state-err">
        {{ error }}
        <button type="button" class="fqa-rv-retry" @click="load(true)">重试</button>
    </div>
    <div v-else-if="loaded && !comments.length" class="fqa-rv-state">
        还没有书评，来写第一条吧
    </div>

    <!-- 列表 -->
    <ul v-if="comments.length" class="fqa-rv-list">
        <li v-for="c in comments" :key="c.id" class="fqa-rv-item">
            <img v-if="c.user.avatar" class="fqa-rv-avatar" :src="c.user.avatar" :alt="c.user.name" loading="lazy">
            <div v-else class="fqa-rv-avatar fqa-rv-avatar-ph">{{ (c.user.name || '?').slice(0, 1) }}</div>

            <div class="fqa-rv-body">
                <div class="fqa-rv-meta">
                    <span class="fqa-rv-name">{{ c.user.name }}</span>
                    <span v-if="c.user.is_author" class="fqa-rv-badge">作者</span>
                    <span v-for="t in c.user.titles" :key="t" class="fqa-rv-badge fqa-rv-badge-soft">{{ t }}</span>
                    <span v-if="c.score > 0" class="fqa-rv-item-stars">{{ '★'.repeat(Math.round(c.score / 2)) }}</span>
                    <span v-if="c.author_stick" class="fqa-rv-badge">置顶</span>
                    <span class="fqa-rv-time">{{ fromNow(c.create_time * 1000) }}</span>
                </div>

                <p class="fqa-rv-text">{{ replaceEmojiTokens(c.text) }}</p>

                <!-- 追评 -->
                <div v-if="c.addition" class="fqa-rv-addition">
                    <span class="fqa-rv-addition-label">追评</span>
                    <p class="fqa-rv-text">{{ replaceEmojiTokens(c.addition.text) }}</p>
                </div>

                <div class="fqa-rv-foot">
                    <button
                        type="button"
                        :class="['fqa-rv-act', { on: c.user_digg }]"
                        @click="like(c)"
                    >👍 {{ c.digg_count || '' }}</button>
                    <button
                        type="button"
                        :class="['fqa-rv-act', { on: c.user_disagree }]"
                        @click="dislike(c)"
                    >👎</button>
                    <button
                        v-if="c.reply_count"
                        type="button"
                        class="fqa-rv-act"
                        @click="toggleReplies(c.id)"
                    >
                        {{ replyState(c).loaded ? '收起回复' : `展开 ${c.reply_count} 条回复` }}
                    </button>
                </div>

                <!-- 一级回复 -->
                <div v-if="replyState(c).loaded || replyState(c).loading" class="fqa-rv-replies">
                    <div v-if="replyState(c).loading" class="fqa-rv-state fqa-rv-state-sm">加载回复…</div>
                    <div v-else-if="replyState(c).error" class="fqa-rv-state fqa-rv-state-sm">{{ replyState(c).error }}</div>
                    <template v-else>
                        <div v-for="r in repliesOf(c)" :key="r.id" class="fqa-rv-reply">
                            <img v-if="r.user.avatar" class="fqa-rv-avatar fqa-rv-avatar-sm" :src="r.user.avatar" :alt="r.user.name" loading="lazy">
                            <div v-else class="fqa-rv-avatar fqa-rv-avatar-sm fqa-rv-avatar-ph">{{ (r.user.name || '?').slice(0, 1) }}</div>
                            <div class="fqa-rv-body">
                                <div class="fqa-rv-meta">
                                    <span class="fqa-rv-name">{{ r.user.name }}</span>
                                    <span v-if="r.user.is_author" class="fqa-rv-badge">作者</span>
                                    <span class="fqa-rv-time">{{ fromNow(r.create_time * 1000) }}</span>
                                </div>
                                <p class="fqa-rv-text">{{ replaceEmojiTokens(r.text) }}</p>
                                <div class="fqa-rv-foot">
                                    <button
                                        v-if="r.sub.length || r.reply_count"
                                        type="button"
                                        class="fqa-rv-act"
                                        @click="expandSubReplies(r)"
                                    >
                                        {{ r.sub.length ? '收起楼中楼' : `楼中楼 ${r.reply_count}` }}
                                    </button>
                                </div>
                                <div v-if="r.sub.length" class="fqa-rv-subreplies">
                                    <div v-for="s in r.sub" :key="s.id" class="fqa-rv-subreply">
                                        <span class="fqa-rv-name">{{ s.user.name }}</span>
                                        <!-- to_reply_id 非空说明是在回复楼中楼里的某一条 -->
                                        <span v-if="s.to_reply_id" class="fqa-rv-to">回复</span>
                                        <span class="fqa-rv-text-inline">：{{ replaceEmojiTokens(s.text) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            v-if="replyState(c).hasMore"
                            type="button"
                            class="fqa-rv-more-link"
                            :disabled="replyState(c).loading"
                            @click="loadMoreReplies(c.id)"
                        >查看更多回复</button>
                    </template>
                </div>
            </div>
        </li>
    </ul>

    <!-- 翻页 -->
    <div v-if="hasMore" class="fqa-rv-more">
        <button type="button" class="fqa-rv-more-btn" :disabled="loadingMore" @click="loadMore">
            {{ loadingMore ? '加载中…' : '加载更多' }}
        </button>
    </div>
</div>
</template>
