// ==UserScript==
// @name         番茄小说助手
// @namespace    https://github.com/naiyQAQ/fanqie-assistant
// @version      0.0.7
// @author       naiyQAQ, xiurenfuwo
// @description  番茄小说助手，去广告、去推广、解锁章节、优化体验。
// @license      GPLv3
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aA0KICAgICAgICBkPSJNMjMuMzExNSAxSDYuNjg4NTNDMy41NDY4NCAxIDEgMy41NDY4NCAxIDYuNjg4NTNWMjMuMzExNUMxIDI2LjQ1MzIgMy41NDY4NCAyOSA2LjY4ODUzIDI5SDIzLjMxMTVDMjYuNDUzMiAyOSAyOSAyNi40NTMyIDI5IDIzLjMxMTVWNi42ODg1M0MyOSAzLjU0Njg0IDI2LjQ1MzIgMSAyMy4zMTE1IDFaIg0KICAgICAgICBmaWxsPSJ3aGl0ZSI+PC9wYXRoPg0KICAgIDxwYXRoDQogICAgICAgIGQ9Ik0yMy4zMTE1IDAuNzVINi42ODg1M0MzLjQwODc3IDAuNzUgMC43NSAzLjQwODc3IDAuNzUgNi42ODg1M1YyMy4zMTE1QzAuNzUgMjYuNTkxMiAzLjQwODc3IDI5LjI1IDYuNjg4NTMgMjkuMjVIMjMuMzExNUMyNi41OTEyIDI5LjI1IDI5LjI1IDI2LjU5MTIgMjkuMjUgMjMuMzExNVY2LjY4ODUzQzI5LjI1IDMuNDA4NzcgMjYuNTkxMiAwLjc1IDIzLjMxMTUgMC43NVoiDQogICAgICAgIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPg0KICAgIDxtYXNrIGlkPSJtYXNrMF80NzBfNDgzNjQiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjEiIHk9IjEiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgICBkPSJNMjMuMzExNSAxSDYuNjg4NTNDMy41NDY4NCAxIDEgMy41NDY4NCAxIDYuNjg4NTNWMjMuMzExNUMxIDI2LjQ1MzIgMy41NDY4NCAyOSA2LjY4ODUzIDI5SDIzLjMxMTVDMjYuNDUzMiAyOSAyOSAyNi40NTMyIDI5IDIzLjMxMTVWNi42ODg1M0MyOSAzLjU0Njg0IDI2LjQ1MzIgMSAyMy4zMTE1IDFaIg0KICAgICAgICAgICAgZmlsbD0id2hpdGUiPjwvcGF0aD4NCiAgICA8L21hc2s+DQogICAgPGcgbWFzaz0idXJsKCNtYXNrMF80NzBfNDgzNjQpIj4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICAgIGQ9Ik0yMy4zMTE1IDFINi42ODg1M0MzLjU0Njg0IDEgMSAzLjU0Njg0IDEgNi42ODg1M1YyMy4zMTE1QzEgMjYuNDUzMiAzLjU0Njg0IDI5IDYuNjg4NTMgMjlIMjMuMzExNUMyNi40NTMyIDI5IDI5IDI2LjQ1MzIgMjkgMjMuMzExNVY2LjY4ODUzQzI5IDMuNTQ2ODQgMjYuNDUzMiAxIDIzLjMxMTUgMVoiDQogICAgICAgICAgICBmaWxsPSJ3aGl0ZSI+PC9wYXRoPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICAgZD0iTTE1LjAwMDggNDguNjY0MkMyNS40MDE3IDQ4LjY2NDIgMzMuODMzNCA0MC4yMzI2IDMzLjgzMzQgMjkuODMxNkMzMy44MzM0IDE5LjQzMDcgMjUuNDAxNyAxMC45OTkgMTUuMDAwOCAxMC45OTlDNC41OTk4NSAxMC45OTkgLTMuODMxNzkgMTkuNDMwNyAtMy44MzE3OSAyOS44MzE2Qy0zLjgzMTc5IDQwLjIzMjYgNC41OTk4NSA0OC42NjQyIDE1LjAwMDggNDguNjY0MloiDQogICAgICAgICAgICBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDcwXzQ4MzY0KSI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBkPSJNMjMuMjY4OCAxVjcuMjEyOTRMMjAuNjY2MyA1LjcxNDM3TDE4LjA2NzQgNy4yMTI5NFYxSDIzLjI2ODhaIiBmaWxsPSIjRkY1RjAwIj48L3BhdGg+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgICBkPSJNMTUuMTM0MyAxOC44ODFDMTUuMTM0MyAxOC44ODEgMTYuMTAxNCAxNy41NTEzIDE2LjEwMTQgMTYuNDA2NUMxNi4xMDE0IDE1LjI2MTcgMTUuNjY3NiAxNC43MzczIDE1LjEzNDMgMTQuNzM3M0MxNC42MDEgMTQuNzM3MyAxNC4xNjczIDE1LjI2MzUgMTQuMTY3MyAxNi40MDY1QzE0LjE2NzMgMTcuNTQ5NiAxNS4xMzQzIDE4Ljg4MSAxNS4xMzQzIDE4Ljg4MVoiDQogICAgICAgICAgICBmaWxsPSJ3aGl0ZSI+PC9wYXRoPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICAgZD0iTTcuNjI3MjQgMjIuNjU4NUM4Ljc3MjA1IDIyLjY1ODUgMTAuMTAxNyAyMy42MjU2IDEwLjEwMTcgMjMuNjI1NkMxMC4xMDE3IDIzLjYyNTYgOC43NzAyNyAyNC41OTI2IDcuNjI3MjQgMjQuNTkyNkM2LjQ4NDIgMjQuNTkyNiA1Ljk1ODAxIDI0LjE1ODkgNS45NTgwMSAyMy42MjU2QzUuOTU4MDEgMjMuMDkyMyA2LjQ4MjQyIDIyLjY1ODUgNy42MjcyNCAyMi42NTg1WiINCiAgICAgICAgICAgIGZpbGw9IndoaXRlIj48L3BhdGg+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgICBkPSJNMjIuNjM5NiAyNC41OTI2QzIxLjQ5NDggMjQuNTkyNiAyMC4xNjUxIDIzLjYyNTYgMjAuMTY1MSAyMy42MjU2QzIwLjE2NTEgMjMuNjI1NiAyMS40OTY2IDIyLjY1ODUgMjIuNjM5NiAyMi42NTg1QzIzLjc4MjYgMjIuNjU4NSAyNC4zMDg4IDIzLjA5MjMgMjQuMzA4OCAyMy42MjU2QzI0LjMwODggMjQuMTU4OSAyMy43ODQ0IDI0LjU5MjYgMjIuNjM5NiAyNC41OTI2WiINCiAgICAgICAgICAgIGZpbGw9IndoaXRlIj48L3BhdGg+DQogICAgICAgIDxwYXRoDQogICAgICAgICAgICBkPSJNMTAuNDU1NSAxOC4zMTM5QzExLjI2NDMgMTkuMTIyNyAxMS41MjIxIDIwLjc0NzUgMTEuNTIyMSAyMC43NDc1QzExLjUyMjEgMjAuNzQ3NSA5Ljg5NzMyIDIwLjQ4OTcgOS4wODg0OCAxOS42ODA5QzguMjc5NjQgMTguODcyMSA4LjIxMzg3IDE4LjE5NDggOC41OTI1MSAxNy44MTYxQzguOTcxMTUgMTcuNDM3NSA5LjY0NjY2IDE3LjUwMzMgMTAuNDU3MyAxOC4zMTIxTDEwLjQ1NTUgMTguMzEzOVoiDQogICAgICAgICAgICBmaWxsPSJ3aGl0ZSI+PC9wYXRoPg0KICAgICAgICA8cGF0aA0KICAgICAgICAgICAgZD0iTTE4Ljc0NjUgMjAuNzQ3NkMxOC43NDY1IDIwLjc0NzYgMTkuMDA0MyAxOS4xMjI4IDE5LjgxMzEgMTguMzE0TDE5LjgxMTMgMTguMzEyMkMyMC42MjIgMTcuNTAzMyAyMS4yOTkzIDE3LjQzOTMgMjEuNjc2MSAxNy44MTYyQzIyLjA1NDggMTguMTk0OSAyMS45ODkgMTguODcyMSAyMS4xODAyIDE5LjY4MUMyMC4zNzEzIDIwLjQ4OTggMTguNzQ2NSAyMC43NDc2IDE4Ljc0NjUgMjAuNzQ3NloiDQogICAgICAgICAgICBmaWxsPSJ3aGl0ZSI+PC9wYXRoPg0KICAgIDwvZz4NCiAgICA8ZGVmcz4NCiAgICAgICAgPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzQ3MF80ODM2NCIgY3g9IjAiIGN5PSIwIiByPSIxIg0KICAgICAgICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiDQogICAgICAgICAgICBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjAwMDggMjkuODMxNikgc2NhbGUoMTguODMyNikiPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0NDMDUwMCI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1RjAwIj48L3N0b3A+DQogICAgICAgIDwvcmFkaWFsR3JhZGllbnQ+DQogICAgPC9kZWZzPg0KPC9zdmc+
// @match        *://*.fanqienovel.com/*
// @require      https://registry.npmmirror.com/vue/3.5.40/files/dist/vue.global.prod.js
// @require      https://registry.npmmirror.com/moment/2.30.1/files/min/moment.min.js
// @require      https://registry.npmmirror.com/jszip/3.10.1/files/dist/jszip.min.js
// @connect      fanqienovel.com
// @connect      jxbhmy.com
// @connect      snssdk.com
// @connect      byteimg.com
// @connect      fqnovelpic.com
// @connect      bytecdn.cn
// @connect      fqnovelvod.com
// @connect      novelfmvod.com
// @connect      volcautovod.com
// @grant        GM_addStyle
// @grant        GM_cookie
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (vue, moment, JSZip) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  const shared_key = new Uint8Array([172, 37, 198, 125, 221, 143, 56, 193, 179, 122, 35, 72, 130, 142, 34, 46]).buffer;
  const fetch$1 = unsafeWindow.fetch;
  unsafeWindow.XMLHttpRequest;
  const defaultConfig = {
    install_id: "2187355326270644",
    device_id: "2187355326004404",
    device_type: "P30"
  };
  const _config = {
    currentConfig: defaultConfig
  };
  const scriptcss = "/* 移除章节锁定图标 */\r\n.muyeicon-lock {\r\n	display: none;\r\n}\r\n/* 移除APP推广图标 */\r\n.muye-to-fanqie {\r\n	display: none!important;\r\n}\r\n.reader-toolbar-item-download {\r\n	display: none!important;\r\n}\r\n.download-btn {\r\n	display: none!important;\r\n}\r\n.download-icon {\r\n	display: none!important;\r\n}\r\n\r\n.fqa-hide {\r\n	display: none!important;\r\n}\r\n/* 404 */\r\n.no-content {\r\n	display: none!important;\r\n}\r\n\r\n.fqa-comic-img {\r\n	width: 100%!important;\r\n	height: 100%!important;\r\n	max-width: 100%!important;\r\n	max-height: 100%!important;\r\n	padding-top: 0!important;\r\n	padding-bottom: 0!important;\r\n	margin-top: 0!important;\r\n	margin-bottom: 0!important;\r\n}\r\n\r\n.fqa-comic-reader {\r\n	line-height: 0!important;\r\n}\r\n\r\n.fqa-menu-item,\r\n.arco-menu-item {\r\n	width: 100%!important;\r\n}\r\n\r\n#dynamic-el {\r\n	display: none!important;\r\n}\r\n\r\n.fqa-footnote-ref {\r\n	display: inline-block;\r\n	margin: 0 0.15em;\r\n	padding: 0 0.25em;\r\n	font-size: 0.7em;\r\n	line-height: 1.4;\r\n	vertical-align: super;\r\n	color: var(--web-brand_normal, #f14646);\r\n	cursor: pointer;\r\n	user-select: none;\r\n	border-radius: 3px;\r\n	text-indent: 0;\r\n}\r\n\r\n.fqa-footnote-ref:hover,\r\n.fqa-footnote-ref:focus-visible {\r\n	background: var(--web-brand_light, rgba(241, 70, 70, 0.12));\r\n	outline: none;\r\n}\r\n\r\n\r\n.fqa-footnote {\r\n	margin-top: 2em;\r\n	padding-top: 1em;\r\n	border-top: 1px solid var(--web-gray_20, rgba(128, 128, 128, 0.25));\r\n	font-size: var(--fqa-body-size, 1.6rem);\r\n}\r\n\r\n.muye-reader-content-16 .fqa-footnote { font-size: var(--fqa-body-size, 1.6rem); }\r\n.muye-reader-content-20 .fqa-footnote { font-size: var(--fqa-body-size, 2rem); }\r\n.muye-reader-content-24 .fqa-footnote { font-size: var(--fqa-body-size, 2.4rem); }\r\n.muye-reader-content-28 .fqa-footnote { font-size: var(--fqa-body-size, 2.8rem); }\r\n.muye-reader-content-32 .fqa-footnote { font-size: var(--fqa-body-size, 3.2rem); }\r\n\r\n.fqa-footnote-title {\r\n	margin-bottom: 0.6em;\r\n	font-size: 0.85em;\r\n	font-weight: 600;\r\n	color: var(--web-gray_40, #8a8a8a);\r\n	text-indent: 0;\r\n}\r\n\r\n.fqa-footnote-list {\r\n	margin: 0;\r\n	padding-left: 1.6em;\r\n	font-size: 0.85em;\r\n	line-height: 1.7;\r\n	color: var(--web-gray_40, #8a8a8a);\r\n}\r\n\r\n.fqa-footnote-list li {\r\n	margin-bottom: 0.5em;\r\n	text-indent: 0;\r\n	transition: background-color 0.3s ease;\r\n}\r\n\r\n.fqa-footnote-list li.fqa-footnote-active {\r\n	background: var(--web-brand_light, rgba(241, 70, 70, 0.12));\r\n	border-radius: 4px;\r\n}\r\n\r\n.muye-reader-content > body {\r\n	background-color: var(--web-bg)!important;\r\n}\r\n\r\n.fqa-icon-dark {\r\n	color: #B3B3B3\r\n}\r\n\r\n/* ----------------------------- 右键菜单 / Toast ----------------------------- */\r\n\r\n/*\r\n * 书架与搜索共用。两者都把菜单 Teleport 到 body，\r\n * 拿不到各自根节点上的变量，所以在这里声明一份全局色板。\r\n */\r\n.fqa-menu {\r\n	--fqa-menu-bg: #fff;\r\n	--fqa-menu-text: #1f2329;\r\n	--fqa-menu-sub: #8f959e;\r\n	--fqa-menu-hover: rgba(31, 35, 41, 0.06);\r\n	--fqa-menu-danger: #f5222d;\r\n\r\n	position: fixed;\r\n	z-index: 2147483001;\r\n	min-width: 132px;\r\n	max-width: 240px;\r\n	padding: 4px;\r\n	box-sizing: border-box;\r\n	background: var(--fqa-menu-bg);\r\n	border: 1px solid rgba(31, 35, 41, 0.08);\r\n	border-radius: 8px;\r\n	box-shadow: 0 6px 24px rgba(31, 35, 41, 0.16);\r\n	font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial,\r\n		sans-serif;\r\n	font-size: 13px;\r\n	color: var(--fqa-menu-text);\r\n	user-select: none;\r\n}\r\n\r\n/* 二级面板：分组数量多时可滚动 */\r\n.fqa-menu-sub {\r\n	max-height: 320px;\r\n	overflow-y: auto;\r\n}\r\n\r\n.fqa-menu-row {\r\n	display: flex;\r\n	align-items: center;\r\n	justify-content: space-between;\r\n	gap: 12px;\r\n	padding: 7px 10px;\r\n	border-radius: 5px;\r\n	line-height: 1.4;\r\n	cursor: pointer;\r\n	white-space: nowrap;\r\n	overflow: hidden;\r\n}\r\n\r\n.fqa-menu-row > span:first-child {\r\n	overflow: hidden;\r\n	text-overflow: ellipsis;\r\n}\r\n\r\n.fqa-menu-row:hover,\r\n.fqa-menu-row.fqa-menu-open {\r\n	background: var(--fqa-menu-hover);\r\n}\r\n\r\n.fqa-menu-arrow {\r\n	color: var(--fqa-menu-sub);\r\n	font-size: 15px;\r\n	line-height: 1;\r\n}\r\n\r\n.fqa-menu-danger {\r\n	color: var(--fqa-menu-danger);\r\n}\r\n\r\n.fqa-menu-disabled {\r\n	color: var(--fqa-menu-sub);\r\n	cursor: not-allowed;\r\n}\r\n\r\n.fqa-menu-disabled:hover {\r\n	background: transparent;\r\n}\r\n\r\n/* 操作结果提示 */\r\n.fqa-toast {\r\n	position: fixed;\r\n	left: 50%;\r\n	bottom: 48px;\r\n	transform: translateX(-50%);\r\n	z-index: 2147483002;\r\n	max-width: 80vw;\r\n	padding: 10px 18px;\r\n	box-sizing: border-box;\r\n	background: rgba(31, 35, 41, 0.88);\r\n	color: #fff;\r\n	border-radius: 8px;\r\n	font-size: 13px;\r\n	line-height: 1.4;\r\n	box-shadow: 0 6px 24px rgba(31, 35, 41, 0.24);\r\n	pointer-events: none;\r\n}\r\n\r\n/* 骨架屏微光。书架与搜索共用同一个动画名 */\r\n@keyframes fqa-shimmer {\r\n	100% {\r\n		transform: translateX(100%);\r\n	}\r\n}\r\n\r\n@media (prefers-color-scheme: dark) {\r\n	.fqa-menu {\r\n		--fqa-menu-bg: #23272e;\r\n		--fqa-menu-text: #e5e6eb;\r\n		--fqa-menu-sub: #8f959e;\r\n		--fqa-menu-hover: rgba(255, 255, 255, 0.08);\r\n		border-color: rgba(255, 255, 255, 0.1);\r\n	}\r\n}\r\n\r\n.info {\r\n	width: 100%!important;\r\n}\r\n\r\n.reader-toolbar {\r\n	user-select: none;\r\n}\r\n/* ---------------------------- 目录弹窗重排 ---------------------------- */\r\n/*\r\n * 站点原本：position:fixed; right:calc(50vw - 480px); width:500px（桌面）\r\n * 改成与正文浅色背景块同宽同位置（960 居中），章节标题一行两个。\r\n */\r\n.reader-catalog {\r\n	right: calc(50vw - 480px) !important;\r\n	width: min(960px, 100vw) !important;\r\n	max-width: 100vw !important;\r\n}\r\n\r\n/* 窄屏放不下 960 时就铺满 */\r\n@media (max-width: 1000px) {\r\n	.reader-catalog {\r\n		right: 0 !important;\r\n		width: 100vw !important;\r\n	}\r\n}\r\n\r\n/* inline-block 之间会有空白字符，把父级字号归零来消除 */\r\n.reader-catalog-chapters {\r\n	font-size: 0 !important;\r\n}\r\n\r\n.reader-catalog-chapters .volume-header {\r\n	display: block !important;\r\n	width: 100% !important;\r\n	font-size: 14px !important;\r\n}\r\n\r\n/* 章节：一行两个 */\r\n.reader-catalog-chapters .chapter-outer-container {\r\n	display: inline-block !important;\r\n	width: 50% !important;\r\n	box-sizing: border-box;\r\n	vertical-align: top;\r\n}\r\n\r\n.reader-catalog-chapters .chapter {\r\n	font-size: 16px !important;\r\n}\r\n\r\n/* ------------------- 段评展开时的联动（目录 / 字号） ------------------- */\r\n\r\n/*\r\n * 目录弹窗跟着正文一起左移。\r\n * 直接吃 --fqa-pc-shift 这个变量，所以目录晚于抽屉打开也能自动对齐，\r\n * 不需要额外挂 JS 或补加 shift 类。\r\n */\r\n.reader-catalog {\r\n	transform: translateX(calc(-1 * var(--fqa-pc-shift, 0px))) !important;\r\n	transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);\r\n}\r\n\r\n/*\r\n * 工具栏本身没有 z-index，字号弹窗（.font-slider-popover*，绝对定位，\r\n * 从工具栏向左展开）会被段评抽屉盖住。把工具栏抬到抽屉之上。\r\n */\r\n.reader-toolbar {\r\n	z-index: 2147483602 !important;\r\n}\r\n\r\n/*\r\n * 目录内容区：站点是 overflow-y:scroll。按 CSS 规范另一个轴会变成 auto，\r\n * 两列布局下哪怕只有 1px 误差也会冒出横向滚动条，直接禁掉横轴。\r\n */\r\n.reader-catalog-content-wrap {\r\n	overflow-x: hidden !important;\r\n}\r\n\r\n/*\r\n * 段评展开时的位移「总开关」。\r\n *\r\n * 以前把 fqa-pc-shift-el 类挂在正文块上，站点一改字号就重排、类被冲掉，\r\n * 正文会先跳回原位再由 JS 补回来。改挂到 <html> 上，元素怎么重渲染都不丢。\r\n */\r\nhtml.fqa-pc-open .muye-reader-box,\r\nhtml.fqa-pc-open .muye-reader-nav {\r\n	transform: translateX(calc(-1 * var(--fqa-pc-shift, 0px))) !important;\r\n	transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);\r\n}\r\n\r\n/*\r\n * 目录按正文实测位置对齐（--fqa-pc-content-right / -width 由 drawer.ts 写入），\r\n * 不再依赖站点写死的 calc(50vw - 480px)，避免抽屉展开时压住目录一角。\r\n */\r\n.reader-catalog {\r\n	right: var(--fqa-pc-content-right, calc(50vw - 480px)) !important;\r\n	width: var(--fqa-pc-content-width, 960px) !important;\r\n}\r\n\r\n/* ---------------------- 目录滚动条跟随日夜主题 ---------------------- */\r\n\r\n.reader-catalog-content-wrap {\r\n	scrollbar-width: thin;\r\n	scrollbar-color: rgba(31, 35, 41, 0.28) transparent;\r\n}\r\n\r\n/* 夜间：color-scheme 让 UA 原生滚动条也走深色，再显式给一版 webkit 样式兜底 */\r\n[muye-data-theme='dark'] .reader-catalog-content-wrap {\r\n	color-scheme: dark;\r\n	scrollbar-color: rgba(255, 255, 255, 0.28) transparent;\r\n}\r\n\r\n.reader-catalog-content-wrap::-webkit-scrollbar {\r\n	width: 8px;\r\n	height: 8px;\r\n}\r\n\r\n.reader-catalog-content-wrap::-webkit-scrollbar-track {\r\n	background: transparent;\r\n}\r\n\r\n.reader-catalog-content-wrap::-webkit-scrollbar-thumb {\r\n	border-radius: 4px;\r\n	background: rgba(31, 35, 41, 0.28);\r\n}\r\n\r\n.reader-catalog-content-wrap::-webkit-scrollbar-thumb:hover {\r\n	background: rgba(31, 35, 41, 0.42);\r\n}\r\n\r\n[muye-data-theme='dark'] .reader-catalog-content-wrap::-webkit-scrollbar-thumb {\r\n	background: rgba(255, 255, 255, 0.28);\r\n}\r\n\r\n[muye-data-theme='dark'] .reader-catalog-content-wrap::-webkit-scrollbar-thumb:hover {\r\n	background: rgba(255, 255, 255, 0.42);\r\n}\r\n";
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function nextFrame() {
    return new Promise((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      const raf = unsafeWindow.requestAnimationFrame;
      if (typeof raf === "function") raf(() => done());
      setTimeout(done, 32);
    });
  }
  function cloneElement(element) {
    return element.cloneNode(true);
  }
  function waitForElement(selector, timeout = 15e3) {
    const existing = document.querySelector(selector);
    if (existing) return Promise.resolve(existing);
    return new Promise((resolve) => {
      let timer;
      const observer2 = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          if (timer) clearTimeout(timer);
          observer2.disconnect();
          resolve(el);
        }
      });
      const start = () => {
        observer2.observe(document.documentElement, { childList: true, subtree: true });
        timer = setTimeout(() => {
          observer2.disconnect();
          resolve(document.querySelector(selector));
        }, timeout);
      };
      if (document.documentElement) {
        start();
      } else {
        document.addEventListener("DOMContentLoaded", start, { once: true });
      }
    });
  }
  function chunk(list, size) {
    const result = [];
    for (let i2 = 0; i2 < list.length; i2 += size) {
      result.push(list.slice(i2, i2 + size));
    }
    return result;
  }
  function concatArrayBuffers(...buffers) {
    const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of buffers) {
      result.set(new Uint8Array(buf), offset);
      offset += buf.byteLength;
    }
    return result.buffer;
  }
  async function inject$1() {
    while (!document.body) {
      console.log("Waiting for body...");
      await sleep(200);
    }
    GM_addStyle(scriptcss);
    console.log("CSS injected successfully!");
  }
  unsafeWindow.localStorage;
  function write(key, value) {
    GM_setValue(key, JSON.stringify(value));
  }
  function read(key) {
    return JSON.parse(GM_getValue(key) || "null");
  }
  function del(key) {
    GM_deleteValue(key);
  }
  const STORE_KEY$1 = "settings";
  const DEFAULT_SETTINGS = {
    decryptFont: true,
    blockReport: true,
    allowCopy: true,
    shelfRemoveConfirm: true,
    logoutConfirm: true,
    readerFont: "",
    customCssEnabled: false,
    customCss: "",
    // 原站书架点封面是继续阅读，保持一致
    bookshelfClickAction: "read",
    enhanceSearch: true,
    // 默认关：携带登录态属于额外的隐私暴露，交给用户显式开启
    searchPersonalized: false,
    enableDownload: true,
    downloadFormat: "epub",
    downloadCharset: "utf-8",
    // 30 是接口单请求返回正文的上限，再大也只回 30 条
    downloadBatchSize: 30,
    // 实测 750ms 能稳定拿满，更短会被限流成每次 1 条
    downloadInterval: 750,
    downloadRetries: 3,
    downloadVolumePage: false,
    downloadImages: true,
    downloadBookCss: true,
    audiobookChapterEnd: "next",
    audiobookFollow: true,
    paraComment: true,
    apiPreference: "app",
    deviceId: "",
    installId: "",
    deviceType: ""
  };
  function normalize(raw) {
    const s = { ...DEFAULT_SETTINGS };
    if (!raw || typeof raw !== "object") return s;
    const o = raw;
    for (const key of Object.keys(DEFAULT_SETTINGS)) {
      const v = o[key];
      if (v === void 0 || v === null) continue;
      if (typeof DEFAULT_SETTINGS[key] === typeof v) {
        s[key] = v;
      }
    }
    if (s.apiPreference !== "app" && s.apiPreference !== "redcandle") {
      s.apiPreference = DEFAULT_SETTINGS.apiPreference;
    }
    if (s.downloadFormat !== "epub" && s.downloadFormat !== "txt") {
      s.downloadFormat = DEFAULT_SETTINGS.downloadFormat;
    }
    if (s.downloadCharset !== "utf-8" && s.downloadCharset !== "gbk") {
      s.downloadCharset = DEFAULT_SETTINGS.downloadCharset;
    }
    if (s.bookshelfClickAction !== "read" && s.bookshelfClickAction !== "detail") {
      s.bookshelfClickAction = DEFAULT_SETTINGS.bookshelfClickAction;
    }
    if (s.audiobookChapterEnd !== "next" && s.audiobookChapterEnd !== "stop") {
      s.audiobookChapterEnd = DEFAULT_SETTINGS.audiobookChapterEnd;
    }
    s.downloadBatchSize = clampInt(s.downloadBatchSize, 1, 30, DEFAULT_SETTINGS.downloadBatchSize);
    s.downloadInterval = clampInt(s.downloadInterval, 0, 1e4, DEFAULT_SETTINGS.downloadInterval);
    s.downloadRetries = clampInt(s.downloadRetries, 0, 10, DEFAULT_SETTINGS.downloadRetries);
    return s;
  }
  function clampInt(value, min, max, fallback) {
    const n = Math.round(Number(value));
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }
  const settings$1 = vue.reactive(normalize(read(STORE_KEY$1)));
  let saveTimer;
  vue.watch(
    settings$1,
    () => {
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        saveTimer = void 0;
        write(STORE_KEY$1, { ...settings$1 });
      }, 200);
    },
    { deep: true }
  );
  function flushSettings() {
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = void 0;
    }
    write(STORE_KEY$1, { ...settings$1 });
  }
  const code_ed = 58715;
  const code_st = 58344;
  const mapping = {
    "DNMrHsV173Pd4pgy": [
      "D在主特家军然表场4要只v和?6别还g现儿岁??此象月3出战工相",
      "o男直失世F都平文什VO将真T那当?会立些u是十张学气大爱两命全",
      "后东性通被1它乐接而感车山公了常以何可话先pi叫轻M士w着变尔快",
      "l个说少色里安花远7难师放t报认面道S?克地度I好机U民写把万同",
      "水新没书电吃像斯5为y白几日教看但第加候作上拉住有法r事应位利你",
      "声身国问马女他Y比父xAHNsX边美对所金活回意到z从j知又内因",
      "点Q三定8Rb正或夫向德听更?得告并本q过记L让打f人就者去原满",
      "体做经K走如孩cG给使物?最笑部?员等受k行一条果动光门头见往自",
      "解成处天能于名其发总母的死手入路进心来h时力多开已许d至由很界n",
      "小与Z想代么分生口再妈望次西风种带J?实情才这?E我神格长觉间年",
      "眼无不亲关结0友信下却重己老2音字m呢明之前高PB目太e9起稜她",
      "也W用方子英每理便四数期中C外样a海们任"
    ],
    "fKts9tCXDjS49UhH": [
      "体y十现快使话却月物水的放知爱方?表风理O老也p常克平几最主她s",
      "将法情o光a我呢J员太每望受教w利军已U人如变得要少斯门电m男没",
      "AK国时中走么何口小向问轻Td神下间车fG度D又大面远就写j给通",
      "起实E?它去S到道数吃们加P是无把事西多界?发新外活解孩只作前Y",
      "尔经?u心告父等Q民全这9果安?i母8r说任先和地C张战场g像c",
      "q你使?样总目x性处音头?应乐关能花I当名手4重字声力友然生代内",
      "里本回真入师象?0点R亲V种动英命ZhX做特边高有B为期自年马认",
      "出接至H正方感所明者棱F住学还分意更其n但比觉以由死家让失士L2",
      "I金叫身报听W再原山海白很见5直位第工个开岁好用都于可同3次四?",
      "日信与女笑满并部什不从或机此?了记三e些bN夫会才几眼两美被一公",
      "来立z长对己看k许因相色后往打结格过世气7子条在书之定v拉成进带",
      "着东上想天他妈1文而路那别德6Mt行候难"
    ],
    "_search": [
      "?s?作口在他能并B士4U克才正们字声高全尔活者动其主报多望放h",
      "w次年?中3特于十入要男同G面分方K什再教本己结1等世N?说gu",
      "期Z外美M行给9文将两许张友0英应向像此白安少何打气常定间花见孩",
      "它直风数使道第水已女山解dP的通关性叫几L妈问回神来S?四里前国",
      "些OvIA心平自无车光代是好却c得种就意先立z子过Yj表?么所接",
      "了名金受J满眼没部那m每车度可R斯经现门明V如走命y6E战很上f",
      "月西7长夫想话变海机x到W一成生信笑但父开内东马日小而后带以三几",
      "为认X死员目位之学远入音呢我q乐象重对个被别F也书棱D写还因家发",
      "时i或住德当oI比觉然吃去公a老亲情体太b方C电理?失力更拉物着",
      "原她工实色感记看出相路大你候2和?与p样新只便最不进Tr做格母总",
      "爱身师轻知往加从?天eH?听场由快边让把任8条头事至起点真手这难",
      "都界用法n处下文Q告地5kt岁有会果利民"
    ]
  };
  const NO_GLYPH = "?";
  const flatCache = /* @__PURE__ */ new Map();
  function tableOf(fontId) {
    const cached = flatCache.get(fontId);
    if (cached) return cached;
    const rows = mapping[fontId];
    if (!rows) return null;
    const flat = [...rows.join("")];
    const expected = code_ed - code_st + 1;
    if (flat.length !== expected) {
      console.error(
        `[fqa:font] 码表 ${fontId} 长度异常：${flat.length}，应为 ${expected}，已禁用该字体的解密`
      );
      flatCache.set(fontId, []);
      return [];
    }
    flatCache.set(fontId, flat);
    return flat;
  }
  const enTag = Object.keys(mapping).map((id) => `.font-${id}`).join(", ");
  function fontIdOf(element) {
    for (const cls of element.classList) {
      if (!cls.startsWith("font-")) continue;
      const id = cls.slice(5);
      if (mapping[id]) return id;
    }
    return null;
  }
  function decryptText(text, fontId) {
    if (window.location.pathname.startsWith("/search")) fontId = "_search";
    const table2 = tableOf(fontId);
    if (!table2 || table2.length === 0) return text;
    let result = "";
    let changed = false;
    for (const char of text) {
      const codePoint = char.codePointAt(0);
      if (typeof codePoint !== "number") {
        return text;
      }
      if (codePoint < code_st || codePoint > code_ed) {
        result += char;
        continue;
      }
      const mapped = table2[codePoint - code_st];
      if (mapped && mapped !== NO_GLYPH) {
        result += mapped;
        changed = true;
      } else {
        result += char;
      }
    }
    return changed ? result : text;
  }
  function decryptElement(element) {
    if (!settings$1.decryptFont) return;
    const fontId = fontIdOf(element);
    if (!fontId) return;
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        // 后代里可能嵌着另一套字体的节点，那部分要用它自己的码表，
        // 交给针对它的 decryptElement 处理，这里跳过整棵子树
        acceptNode(node) {
          var _a;
          const owner = (_a = node.parentElement) == null ? void 0 : _a.closest(enTag);
          return owner && owner !== element ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    let textNode;
    while (textNode = walker.nextNode()) {
      const oldText = textNode.nodeValue;
      if (!oldText) {
        continue;
      }
      const newText = decryptText(oldText, fontId);
      if (newText !== oldText) {
        textNode.nodeValue = newText;
      }
    }
  }
  function decryptPage(root) {
    if (root instanceof Element && root.matches(enTag)) {
      decryptElement(root);
    }
    root.querySelectorAll(enTag).forEach(decryptElement);
  }
  function initFontDecrypt() {
    const observer2 = new MutationObserver((mutations) => {
      var _a, _b;
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const encryptedElement = (_a = mutation.target.parentElement) == null ? void 0 : _a.closest(
            enTag
          );
          if (encryptedElement) {
            decryptElement(encryptedElement);
          }
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            decryptPage(node);
            continue;
          }
          if (node.nodeType === Node.TEXT_NODE) {
            const encryptedElement = (_b = node.parentElement) == null ? void 0 : _b.closest(
              enTag
            );
            if (encryptedElement) {
              decryptElement(encryptedElement);
            }
          }
        }
      }
    });
    observer2.observe(document, {
      subtree: true,
      childList: true,
      characterData: true
    });
    decryptPage(document);
    vue.watch(
      () => settings$1.decryptFont,
      (on) => {
        if (on) decryptPage(document);
      }
    );
  }
  const STYLE_ID$7 = "fqa-user-style";
  const READER_SCOPE = "#fqa-reader-content, .muye-reader-content";
  function buildCss() {
    const parts = [];
    const font = settings$1.readerFont.trim();
    if (font) {
      const family = /^["']|,/.test(font) ? font : `"${font}"`;
      parts.push(`${READER_SCOPE}, ${READER_SCOPE} p { font-family: ${family}, inherit !important; }`);
    }
    if (settings$1.customCssEnabled && settings$1.customCss.trim()) {
      parts.push(settings$1.customCss);
    }
    return parts.join("\n");
  }
  function apply() {
    const css = buildCss();
    let el = document.getElementById(STYLE_ID$7);
    if (!css) {
      el == null ? void 0 : el.remove();
      return;
    }
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID$7;
      document.head.appendChild(el);
    }
    el.textContent = css;
  }
  function initUserStyle() {
    apply();
    vue.watch(
      () => [settings$1.readerFont, settings$1.customCssEnabled, settings$1.customCss],
      apply
    );
  }
  class EmptyResponseError extends Error {
    constructor(status) {
      super(`服务端返回了空响应体(HTTP ${status})`);
      __publicField(this, "status");
      this.name = "EmptyResponseError";
      this.status = status;
    }
  }
  function isEmptyResponse(res) {
    const text = res.responseText;
    return typeof text !== "string" || text === "";
  }
  const supportedMethods = /* @__PURE__ */ new Set([
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE"
  ]);
  function apiFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      const { signal } = options;
      if (signal == null ? void 0 : signal.aborted) {
        reject(signal.reason ?? new DOMException("The operation was aborted", "AbortError"));
        return;
      }
      const headers = normalizeHeaders$1(options.headers);
      const data = normalizeBody(options.body);
      const method = options.method ?? (data ? "POST" : "GET");
      if (!supportedMethods.has(method)) {
        reject(new TypeError(`Unsupported request method: ${method}`));
        return;
      }
      let request;
      const abort = () => request == null ? void 0 : request.abort();
      function cleanup() {
        signal == null ? void 0 : signal.removeEventListener("abort", abort);
      }
      request = GM_xmlhttpRequest({
        url,
        method,
        headers,
        data,
        anonymous: options.credentials === "omit",
        redirect: options.redirect === "error" ? "error" : "follow",
        onload(response) {
          cleanup();
          resolve(Object.assign(response, {
            json() {
              if (isEmptyResponse(this)) {
                throw new EmptyResponseError(this.status);
              }
              return JSON.parse(this.responseText);
            }
          }));
        },
        onerror(response) {
          cleanup();
          reject(createRequestError("Network request failed", response));
        },
        ontimeout() {
          cleanup();
          reject(createRequestError("Network request timed out", {
            status: 0,
            statusText: "Timeout",
            url
          }));
        },
        onabort() {
          cleanup();
          reject(
            (signal == null ? void 0 : signal.reason) ?? new DOMException("The operation was aborted", "AbortError")
          );
        }
      });
      signal == null ? void 0 : signal.addEventListener("abort", abort, { once: true });
    });
  }
  function fetchArrayBuffer(url) {
    return fetch$1(url, { referrerPolicy: "no-referrer" }).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.arrayBuffer();
    }).catch((err) => {
      console.debug("[fqa:img] 页面 fetch 失败，改用 GM_xmlhttpRequest:", url, err);
      return gmArrayBuffer(url);
    });
  }
  function gmArrayBuffer(url) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        url,
        method: "GET",
        responseType: "arraybuffer",
        onload(response) {
          const buf = response.response;
          if (response.status >= 200 && response.status < 300 && (buf == null ? void 0 : buf.byteLength)) {
            resolve(buf);
          } else {
            reject(new Error(`GM 请求失败(${response.status})`));
          }
        },
        onerror() {
          reject(new Error(`GM 请求出错，检查 @connect 是否覆盖该域名: ${url}`));
        },
        ontimeout: () => reject(new Error("GM 请求超时"))
      });
    });
  }
  function normalizeHeaders$1(headers) {
    if (!headers) {
      return void 0;
    }
    return Object.fromEntries(new Headers(headers).entries());
  }
  function normalizeBody(body) {
    if (body == null) {
      return void 0;
    }
    if (body instanceof URLSearchParams) {
      return body.toString();
    }
    if (typeof body === "string" || body instanceof Blob || body instanceof ArrayBuffer || body instanceof FormData) {
      return body;
    }
    if (ArrayBuffer.isView(body)) {
      return body.buffer.slice(
        body.byteOffset,
        body.byteOffset + body.byteLength
      );
    }
    throw new TypeError(
      "GM_xmlhttpRequest does not support ReadableStream request bodies"
    );
  }
  function createRequestError(message, response) {
    const error = new TypeError(message);
    Object.defineProperty(error, "response", {
      configurable: true,
      enumerable: false,
      value: response
    });
    return error;
  }
  function rotateLeft(value, shiftBits) {
    return value << shiftBits | value >>> 32 - shiftBits;
  }
  function addUnsigned(left, right) {
    return left + right >>> 0;
  }
  function f(x, y, z) {
    return x & y | ~x & z;
  }
  function g(x, y, z) {
    return x & z | y & ~z;
  }
  function h(x, y, z) {
    return x ^ y ^ z;
  }
  function i(x, y, z) {
    return y ^ (x | ~z);
  }
  function ff(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac)), s), b);
  }
  function gg(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac)), s), b);
  }
  function hh(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac)), s), b);
  }
  function ii(a, b, c, d, x, s, ac) {
    return addUnsigned(rotateLeft(addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac)), s), b);
  }
  function convertToWordArray(bytes) {
    const wordCount = Math.ceil((bytes.length + 9) / 64) * 16;
    const words = new Array(wordCount).fill(0);
    for (let byteIndex = 0; byteIndex < bytes.length; byteIndex++) {
      const wordIndex = Math.floor(byteIndex / 4);
      const bytePosition = byteIndex % 4 * 8;
      words[wordIndex] = words[wordIndex] | bytes[byteIndex] << bytePosition;
    }
    const paddingWordIndex = Math.floor(bytes.length / 4);
    const paddingBytePosition = bytes.length % 4 * 8;
    words[paddingWordIndex] = words[paddingWordIndex] | 128 << paddingBytePosition;
    words[wordCount - 2] = bytes.length << 3;
    words[wordCount - 1] = bytes.length >>> 29;
    return words;
  }
  function wordToHex(value) {
    let hex2 = "";
    for (let byteIndex = 0; byteIndex < 4; byteIndex++) {
      const byte = value >>> byteIndex * 8 & 255;
      hex2 += byte.toString(16).padStart(2, "0");
    }
    return hex2;
  }
  function md5(input) {
    const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
    const words = convertToWordArray(bytes);
    let a = 1732584193;
    let b = 4023233417;
    let c = 2562383102;
    let d = 271733878;
    for (let k = 0; k < words.length; k += 16) {
      const aa = a;
      const bb = b;
      const cc = c;
      const dd = d;
      a = ff(a, b, c, d, words[k], 7, 3614090360);
      d = ff(d, a, b, c, words[k + 1], 12, 3905402710);
      c = ff(c, d, a, b, words[k + 2], 17, 606105819);
      b = ff(b, c, d, a, words[k + 3], 22, 3250441966);
      a = ff(a, b, c, d, words[k + 4], 7, 4118548399);
      d = ff(d, a, b, c, words[k + 5], 12, 1200080426);
      c = ff(c, d, a, b, words[k + 6], 17, 2821735955);
      b = ff(b, c, d, a, words[k + 7], 22, 4249261313);
      a = ff(a, b, c, d, words[k + 8], 7, 1770035416);
      d = ff(d, a, b, c, words[k + 9], 12, 2336552879);
      c = ff(c, d, a, b, words[k + 10], 17, 4294925233);
      b = ff(b, c, d, a, words[k + 11], 22, 2304563134);
      a = ff(a, b, c, d, words[k + 12], 7, 1804603682);
      d = ff(d, a, b, c, words[k + 13], 12, 4254626195);
      c = ff(c, d, a, b, words[k + 14], 17, 2792965006);
      b = ff(b, c, d, a, words[k + 15], 22, 1236535329);
      a = gg(a, b, c, d, words[k + 1], 5, 4129170786);
      d = gg(d, a, b, c, words[k + 6], 9, 3225465664);
      c = gg(c, d, a, b, words[k + 11], 14, 643717713);
      b = gg(b, c, d, a, words[k], 20, 3921069994);
      a = gg(a, b, c, d, words[k + 5], 5, 3593408605);
      d = gg(d, a, b, c, words[k + 10], 9, 38016083);
      c = gg(c, d, a, b, words[k + 15], 14, 3634488961);
      b = gg(b, c, d, a, words[k + 4], 20, 3889429448);
      a = gg(a, b, c, d, words[k + 9], 5, 568446438);
      d = gg(d, a, b, c, words[k + 14], 9, 3275163606);
      c = gg(c, d, a, b, words[k + 3], 14, 4107603335);
      b = gg(b, c, d, a, words[k + 8], 20, 1163531501);
      a = gg(a, b, c, d, words[k + 13], 5, 2850285829);
      d = gg(d, a, b, c, words[k + 2], 9, 4243563512);
      c = gg(c, d, a, b, words[k + 7], 14, 1735328473);
      b = gg(b, c, d, a, words[k + 12], 20, 2368359562);
      a = hh(a, b, c, d, words[k + 5], 4, 4294588738);
      d = hh(d, a, b, c, words[k + 8], 11, 2272392833);
      c = hh(c, d, a, b, words[k + 11], 16, 1839030562);
      b = hh(b, c, d, a, words[k + 14], 23, 4259657740);
      a = hh(a, b, c, d, words[k + 1], 4, 2763975236);
      d = hh(d, a, b, c, words[k + 4], 11, 1272893353);
      c = hh(c, d, a, b, words[k + 7], 16, 4139469664);
      b = hh(b, c, d, a, words[k + 10], 23, 3200236656);
      a = hh(a, b, c, d, words[k + 13], 4, 681279174);
      d = hh(d, a, b, c, words[k], 11, 3936430074);
      c = hh(c, d, a, b, words[k + 3], 16, 3572445317);
      b = hh(b, c, d, a, words[k + 6], 23, 76029189);
      a = hh(a, b, c, d, words[k + 9], 4, 3654602809);
      d = hh(d, a, b, c, words[k + 12], 11, 3873151461);
      c = hh(c, d, a, b, words[k + 15], 16, 530742520);
      b = hh(b, c, d, a, words[k + 2], 23, 3299628645);
      a = ii(a, b, c, d, words[k], 6, 4096336452);
      d = ii(d, a, b, c, words[k + 7], 10, 1126891415);
      c = ii(c, d, a, b, words[k + 14], 15, 2878612391);
      b = ii(b, c, d, a, words[k + 5], 21, 4237533241);
      a = ii(a, b, c, d, words[k + 12], 6, 1700485571);
      d = ii(d, a, b, c, words[k + 3], 10, 2399980690);
      c = ii(c, d, a, b, words[k + 10], 15, 4293915773);
      b = ii(b, c, d, a, words[k + 1], 21, 2240044497);
      a = ii(a, b, c, d, words[k + 8], 6, 1873313359);
      d = ii(d, a, b, c, words[k + 15], 10, 4264355552);
      c = ii(c, d, a, b, words[k + 6], 15, 2734768916);
      b = ii(b, c, d, a, words[k + 13], 21, 1309151649);
      a = ii(a, b, c, d, words[k + 4], 6, 4149444226);
      d = ii(d, a, b, c, words[k + 11], 10, 3174756917);
      c = ii(c, d, a, b, words[k + 2], 15, 718787259);
      b = ii(b, c, d, a, words[k + 9], 21, 3951481745);
      a = addUnsigned(a, aa);
      b = addUnsigned(b, bb);
      c = addUnsigned(c, cc);
      d = addUnsigned(d, dd);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }
  function rotl(value, shift) {
    const normalizedShift = shift & 31;
    return value << normalizedShift | value >>> 32 - normalizedShift;
  }
  function p0(value) {
    return value ^ rotl(value, 9) ^ rotl(value, 17);
  }
  function p1(value) {
    return value ^ rotl(value, 15) ^ rotl(value, 23);
  }
  function sm3(input) {
    const inputLength = input.length;
    const paddedLength = Math.ceil((inputLength + 9) / 64) * 64;
    const message = new Uint8Array(paddedLength);
    message.set(input);
    message[inputLength] = 128;
    const bitLength = BigInt(inputLength) * 8n;
    for (let i2 = 0; i2 < 8; i2++) {
      message[paddedLength - 1 - i2] = Number(bitLength >> BigInt(i2 * 8) & 0xffn);
    }
    const dataView = new DataView(message.buffer);
    const state2 = new Uint32Array([
      1937774191,
      1226093241,
      388252375,
      3666478592,
      2842636476,
      372324522,
      3817729613,
      2969243214
    ]);
    const words = new Uint32Array(68);
    const expandedWords = new Uint32Array(64);
    for (let block = 0; block < message.length / 64; block++) {
      const start = block * 64;
      for (let i2 = 0; i2 < 16; i2++) {
        words[i2] = dataView.getUint32(start + i2 * 4, false);
      }
      for (let i2 = 16; i2 < 68; i2++) {
        words[i2] = p1(words[i2 - 16] ^ words[i2 - 9] ^ rotl(words[i2 - 3], 15)) ^ rotl(words[i2 - 13], 7) ^ words[i2 - 6];
      }
      for (let i2 = 0; i2 < 64; i2++) {
        expandedWords[i2] = words[i2] ^ words[i2 + 4];
      }
      let a = state2[0];
      let b = state2[1];
      let c = state2[2];
      let d = state2[3];
      let e = state2[4];
      let f2 = state2[5];
      let g2 = state2[6];
      let h2 = state2[7];
      for (let i2 = 0; i2 < 64; i2++) {
        const t = i2 <= 15 ? 2043430169 : 2055708042;
        const ss1 = rotl(rotl(a, 12) + e + rotl(t, i2), 7);
        const ss2 = ss1 ^ rotl(a, 12);
        const tt1 = (i2 <= 15 ? a ^ b ^ c : a & b | a & c | b & c) + d + ss2 + expandedWords[i2];
        const tt2 = (i2 <= 15 ? e ^ f2 ^ g2 : e & f2 | ~e & g2) + h2 + ss1 + words[i2];
        d = c;
        c = rotl(b, 9);
        b = a;
        a = tt1;
        h2 = g2;
        g2 = rotl(f2, 19);
        f2 = e;
        e = p0(tt2);
      }
      state2[0] = state2[0] ^ a;
      state2[1] = state2[1] ^ b;
      state2[2] = state2[2] ^ c;
      state2[3] = state2[3] ^ d;
      state2[4] = state2[4] ^ e;
      state2[5] = state2[5] ^ f2;
      state2[6] = state2[6] ^ g2;
      state2[7] = state2[7] ^ h2;
    }
    const result = new Uint8Array(32);
    for (let i2 = 0; i2 < state2.length; i2++) {
      const word = state2[i2];
      result[i2 * 4] = word >>> 24;
      result[i2 * 4 + 1] = word >>> 16;
      result[i2 * 4 + 2] = word >>> 8;
      result[i2 * 4 + 3] = word;
    }
    return result;
  }
  function getCrypto() {
    const c = globalThis.crypto ?? unsafeWindow.crypto;
    if (!(c == null ? void 0 : c.subtle)) {
      throw new Error("Crypto API不可用，请检查浏览器版本是否支持该API");
    }
    return c;
  }
  function getSubtle() {
    return getCrypto().subtle;
  }
  function b64decode(b64) {
    const binaryString = atob(b64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i2 = 0; i2 < len; i2++) {
      bytes[i2] = binaryString.charCodeAt(i2);
    }
    return bytes.buffer;
  }
  function b64encode(buffer) {
    const bytes = new Uint8Array(buffer);
    const chunkSize = 32768;
    const chunks = [];
    for (let i2 = 0; i2 < bytes.length; i2 += chunkSize) {
      chunks.push(
        String.fromCharCode(...bytes.subarray(i2, i2 + chunkSize))
      );
    }
    return btoa(chunks.join(""));
  }
  function unhex(hex2) {
    if (hex2.length % 2 !== 0) {
      throw new Error("Invalid hex string");
    }
    const bytes = new Uint8Array(hex2.length / 2);
    for (let i2 = 0; i2 < hex2.length; i2 += 2) {
      const byte = parseInt(hex2.slice(i2, i2 + 2), 16);
      if (Number.isNaN(byte)) {
        throw new Error("Invalid hex string");
      }
      bytes[i2 / 2] = byte;
    }
    return bytes.buffer;
  }
  function hex(buffer) {
    const bytes = new Uint8Array(buffer);
    let hexString = "";
    for (let i2 = 0; i2 < bytes.length; i2++) {
      hexString += bytes[i2].toString(16).padStart(2, "0");
    }
    return hexString;
  }
  function pkcs7Pad(data, blockSize = 16) {
    const padLength = blockSize - data.length % blockSize;
    const padded = new Uint8Array(data.length + padLength);
    padded.set(data);
    padded.fill(padLength, data.length);
    return padded;
  }
  function randomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const array = new Uint8Array(length);
    getCrypto().getRandomValues(array);
    for (let i2 = 0; i2 < length; i2++) {
      result += chars.charAt(array[i2] % chars.length);
    }
    return result;
  }
  function toBytes$1(input) {
    if (typeof input === "string") {
      return new TextEncoder().encode(input);
    }
    if (input instanceof Uint8Array) {
      return new Uint8Array(input);
    }
    return new Uint8Array(input);
  }
  const hash = {
    sha256: async (input) => {
      const subtle = getSubtle();
      const digest = await subtle.digest("SHA-256", toBytes$1(input));
      return hex(digest);
    },
    sha256bytes: async (input) => {
      const subtle = getSubtle();
      return subtle.digest("SHA-256", toBytes$1(input));
    },
    sha512: async (input) => {
      const subtle = getSubtle();
      const digest = await subtle.digest("SHA-512", toBytes$1(input));
      return hex(digest);
    },
    sha512bytes: async (input) => {
      const subtle = getSubtle();
      return subtle.digest("SHA-512", toBytes$1(input));
    },
    md5: async (input) => md5(
      typeof input === "string" ? input : toBytes$1(input).buffer
    ),
    md5bytes: async (input) => unhex(md5(
      typeof input === "string" ? input : toBytes$1(input).buffer
    )),
    sm3: async (input) => hex(sm3(toBytes$1(input)).buffer),
    sm3bytes: async (input) => sm3(toBytes$1(input)).buffer
  };
  const WIRE_VARINT = 0;
  const WIRE_BYTES = 2;
  const WIRE_FIXED32 = 5;
  class ProtobufWriter {
    constructor() {
      __publicField(this, "buf", []);
    }
    writeVarint(value) {
      let v = value >>> 0;
      while (v >= 128) {
        this.buf.push(v & 127 | 128);
        v >>>= 7;
      }
      this.buf.push(v & 127);
      return this;
    }
    writeKey(fieldNumber, wireType) {
      return this.writeVarint(fieldNumber << 3 | wireType);
    }
    varint(fieldNumber, value) {
      return this.writeKey(fieldNumber, WIRE_VARINT).writeVarint(value);
    }
    fixed32(fieldNumber, value) {
      this.writeKey(fieldNumber, WIRE_FIXED32);
      const v = value >>> 0;
      this.buf.push(v & 255, v >>> 8 & 255, v >>> 16 & 255, v >>> 24 & 255);
      return this;
    }
    bytes(fieldNumber, data) {
      this.writeKey(fieldNumber, WIRE_BYTES).writeVarint(data.length);
      for (let i2 = 0; i2 < data.length; i2++) {
        this.buf.push(data[i2] & 255);
      }
      return this;
    }
    string(fieldNumber, value) {
      return this.bytes(fieldNumber, new TextEncoder().encode(value));
    }
    message(fieldNumber, build) {
      const sub = new ProtobufWriter();
      build(sub);
      return this.bytes(fieldNumber, sub.toBytes());
    }
    toBytes() {
      return Uint8Array.from(this.buf);
    }
  }
  const ROUNDS$1 = 72;
  const MASK64$1 = 0xffffffffffffffffn;
  const Z4 = 0x3dc94c3a046d678bn;
  function getBit(value, position) {
    return value >> BigInt(position) & 1n;
  }
  function rotateLeft64(v, n) {
    return (v << n | v >> 64n - n) & MASK64$1;
  }
  function rotateRight64(v, n) {
    return (v << 64n - n | v >> n) & MASK64$1;
  }
  function keyExpansion(key) {
    const k = [key[0] & MASK64$1, key[1] & MASK64$1, key[2] & MASK64$1, key[3] & MASK64$1];
    for (let i2 = 4; i2 < ROUNDS$1; i2++) {
      let tmp = rotateRight64(k[i2 - 1], 3n);
      tmp ^= k[i2 - 3];
      tmp ^= rotateRight64(tmp, 1n);
      k.push((~k[i2 - 4] ^ tmp ^ getBit(Z4, (i2 - 4) % 62) ^ 3n) & MASK64$1);
    }
    return k;
  }
  function simonEncrypt(plaintext, key) {
    const k = keyExpansion(key);
    let x = plaintext[0] & MASK64$1;
    let y = plaintext[1] & MASK64$1;
    for (let i2 = 0; i2 < ROUNDS$1; i2++) {
      const tmp = y;
      const f2 = rotateLeft64(y, 1n) & rotateLeft64(y, 8n);
      y = (x ^ f2 ^ rotateLeft64(y, 2n) ^ k[i2]) & MASK64$1;
      x = tmp;
    }
    return [x, y];
  }
  const LOW_RAND = new Uint8Array([242, 129]);
  const HIGH_RAND = new Uint8Array([97, 111]);
  const XOR_PREFIX = new Uint8Array([242, 247, 252, 255, 242, 247, 252, 255]);
  function sm3Prefix6(data) {
    return sm3(data).slice(0, 6);
  }
  function decodeStub(xssStub) {
    const bytes = new Uint8Array(16);
    if (xssStub.length >= 32) {
      for (let i2 = 0; i2 < 16; i2++) {
        bytes[i2] = parseInt(xssStub.slice(i2 * 2, i2 * 2 + 2), 16) & 255;
      }
    }
    return bytes;
  }
  function buildProtobuf(query, xssStub, timestamp, config) {
    const params = new URLSearchParams(query);
    const deviceId = params.get("device_id") ?? "";
    const versionName = params.get("version_name") ?? "";
    const bodyHash = sm3Prefix6(xssStub === "" ? new Uint8Array(16) : decodeStub(xssStub));
    const queryHash = sm3Prefix6(
      query === "" ? new Uint8Array(16) : new TextEncoder().encode(query)
    );
    const rand = getCrypto().getRandomValues(new Uint32Array(1))[0] % 2147483647;
    return new ProtobufWriter().varint(1, 538970409 * 2).varint(2, 2).varint(3, rand).string(4, config.aid).string(5, deviceId).string(6, config.licenseId).string(7, versionName).string(8, config.sdkVersion).varint(9, config.sdkVersionInt).bytes(10, new Uint8Array(8)).varint(11, 0).varint(12, timestamp * 2).bytes(13, bodyHash).bytes(14, queryHash).message(15, (sub) => {
      sub.varint(1, 1).varint(2, 1).varint(3, 1).varint(7, 3348294860);
    }).string(16, "").string(20, "none").varint(21, config.callType).message(23, (sub) => {
      sub.string(1, "NX551J").varint(2, 8196).varint(4, 2162219008);
    }).varint(25, 2).toBytes();
  }
  async function getArgus(query, xssStub, timestamp, config) {
    const { signKey } = config;
    if (signKey.length !== 32) {
      throw new Error(`Sign key must be 32 bytes, got ${signKey.length}`);
    }
    const protobuf = pkcs7Pad(buildProtobuf(query, xssStub, timestamp, config), 16);
    const sm3Input = new Uint8Array(signKey.length * 2 + LOW_RAND.length + HIGH_RAND.length);
    sm3Input.set(signKey, 0);
    sm3Input.set(LOW_RAND, signKey.length);
    sm3Input.set(HIGH_RAND, signKey.length + LOW_RAND.length);
    sm3Input.set(signKey, signKey.length + LOW_RAND.length + HIGH_RAND.length);
    const sm3Output = sm3(sm3Input);
    const keyView = new DataView(sm3Output.buffer, sm3Output.byteOffset, sm3Output.byteLength);
    const simonKey = [
      keyView.getBigUint64(0, true),
      keyView.getBigUint64(8, true),
      keyView.getBigUint64(16, true),
      keyView.getBigUint64(24, true)
    ];
    const encrypted = new Uint8Array(protobuf.length);
    const pbView = new DataView(protobuf.buffer, protobuf.byteOffset, protobuf.byteLength);
    const encView = new DataView(encrypted.buffer);
    for (let offset = 0; offset < protobuf.length; offset += 16) {
      const [low, high] = simonEncrypt(
        [pbView.getBigUint64(offset, true), pbView.getBigUint64(offset + 8, true)],
        simonKey
      );
      encView.setBigUint64(offset, low, true);
      encView.setBigUint64(offset + 8, high, true);
    }
    const data = new Uint8Array(XOR_PREFIX.length + encrypted.length);
    data.set(XOR_PREFIX);
    data.set(encrypted, XOR_PREFIX.length);
    for (let i2 = XOR_PREFIX.length; i2 < data.length; i2++) {
      data[i2] ^= data[i2 % 8];
    }
    data.reverse();
    const header = new Uint8Array([166, 110, 173, 159, 119, 1, 208, 12, 24]);
    const plaintext = new Uint8Array(header.length + data.length + HIGH_RAND.length);
    plaintext.set(header);
    plaintext.set(data, header.length);
    plaintext.set(HIGH_RAND, header.length + data.length);
    const subtle = getSubtle();
    const aesKey = await subtle.importKey(
      "raw",
      await hash.md5bytes(signKey.slice(0, 16)),
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );
    const iv = await hash.md5bytes(signKey.slice(16));
    const ciphertext = new Uint8Array(
      await subtle.encrypt({ name: "AES-CBC", iv }, aesKey, plaintext)
    );
    const result = new Uint8Array(LOW_RAND.length + ciphertext.length);
    result.set(LOW_RAND);
    result.set(ciphertext, LOW_RAND.length);
    return b64encode(result.buffer);
  }
  const ROUNDS = 34;
  const MASK64 = 0xffffffffffffffffn;
  const WORD_SIZE = 64n;
  const ALPHA = 8n;
  const BETA = 3n;
  function readUint64LE(view, offset) {
    return view.getBigUint64(offset, true);
  }
  function keySchedule(key) {
    const view = new DataView(key.buffer, key.byteOffset, key.byteLength);
    const ks = [readUint64LE(view, 0) & MASK64];
    const numWords = key.length * 8 / Number(WORD_SIZE);
    const ls = [];
    for (let i2 = 1; i2 < numWords; i2++) {
      ls.push(readUint64LE(view, i2 * 8) & MASK64);
    }
    for (let x = 0; x < ROUNDS - 1; x++) {
      const rsX = (ls[x] << WORD_SIZE - ALPHA) + (ls[x] >> ALPHA) & MASK64;
      const addSxy = rsX + ks[x] & MASK64;
      const newX = BigInt(x) ^ addSxy;
      const lsY = (ks[x] >> WORD_SIZE - BETA) + (ks[x] << BETA) & MASK64;
      ls.push(newX);
      ks.push(newX ^ lsY);
    }
    return ks;
  }
  function encryptBlock(ks, block, out, outOffset) {
    const view = new DataView(block.buffer, block.byteOffset, block.byteLength);
    let y = readUint64LE(view, 0);
    let x = readUint64LE(view, 8);
    for (const k of ks) {
      const rsX = (x << WORD_SIZE - ALPHA) + (x >> ALPHA) & MASK64;
      const addSxy = rsX + y & MASK64;
      x = k ^ addSxy;
      const lsY = (y >> WORD_SIZE - BETA) + (y << BETA) & MASK64;
      y = x ^ lsY;
    }
    const outView = new DataView(out.buffer, out.byteOffset, out.byteLength);
    outView.setBigUint64(outOffset, y & MASK64, true);
    outView.setBigUint64(outOffset + 8, x & MASK64, true);
  }
  function speckEncrypt(key, plaintext) {
    if (key.length !== 32) {
      throw new Error(`Speck key must be 32 bytes, got ${key.length}`);
    }
    const padded = pkcs7Pad(plaintext, 16);
    const ks = keySchedule(key);
    const out = new Uint8Array(padded.length);
    for (let i2 = 0; i2 < padded.length; i2 += 16) {
      encryptBlock(ks, padded.subarray(i2, i2 + 16), out, i2);
    }
    return out;
  }
  async function generateLadonKey(randomBytes, aid) {
    const aidBytes = new TextEncoder().encode(aid);
    const input = new Uint8Array(randomBytes.length + aidBytes.length);
    input.set(randomBytes);
    input.set(aidBytes, randomBytes.length);
    const hex2 = await hash.md5(input);
    return new TextEncoder().encode(hex2);
  }
  async function getLadon(timestamp, config) {
    const randomBytes = getCrypto().getRandomValues(new Uint8Array(4));
    const plaintext = new TextEncoder().encode(
      `${timestamp}-${config.licenseId}-${config.aid}`
    );
    const key = await generateLadonKey(randomBytes, config.aid);
    const encrypted = speckEncrypt(key, plaintext);
    const result = new Uint8Array(randomBytes.length + encrypted.length);
    result.set(randomBytes);
    result.set(encrypted, randomBytes.length);
    return b64encode(result.buffer);
  }
  const defaultUnidbgConfig = {
    signKey: new Uint8Array(
      unhex("ac1adaae95a7af94a5114ab3b3a97dd80050aa0a39314c40528caec95256c28c")
    ),
    aid: "1967",
    licenseId: "1611921764",
    sdkVersion: "v04.04.05-ov-android",
    sdkVersionInt: 134744640,
    callType: 738
  };
  async function generateHeaders(rawQuery, xssStub = "", timestamp = Math.floor(Date.now() / 1e3), config = defaultUnidbgConfig) {
    const [argus, ladon] = await Promise.all([
      getArgus(rawQuery, xssStub, timestamp, config),
      getLadon(timestamp, config)
    ]);
    return {
      "x-argus": argus,
      "x-ladon": ladon,
      "x-khronos": String(timestamp)
    };
  }
  async function signRequest(url, body, config = defaultUnidbgConfig) {
    const rawQuery = new URL(url).search.replace(/^\?/, "");
    const hasBody = typeof body === "string" ? body.length > 0 : ((body == null ? void 0 : body.byteLength) ?? 0) > 0;
    const xssStub = hasBody ? await hash.md5(body) : "";
    const now = Date.now();
    const headers = await generateHeaders(
      rawQuery,
      xssStub,
      Math.floor(now / 1e3),
      config
    );
    headers["x-ss-req-ticket"] = String(now);
    if (hasBody) {
      headers["X-SS-STUB"] = xssStub;
    }
    return headers;
  }
  async function gzip(data) {
    if (typeof data === "string") {
      data = new TextEncoder().encode(data).buffer;
    }
    const encoder = new CompressionStream("gzip");
    const stream = new Blob([data]).stream().pipeThrough(encoder);
    const compressed = new Response(stream).arrayBuffer();
    return compressed;
  }
  async function gunzip(data) {
    const decoder = new DecompressionStream("gzip");
    const stream = new Blob([data]).stream().pipeThrough(decoder);
    const decompressed = new Response(stream).arrayBuffer();
    return decompressed;
  }
  const FIXED_STRING = b64decode(
    "TdTC5rgxYgkOUrPHpnM7pByyRiuCmrWKGWs521cXdST0m69/COjWjSanLjfBqVovHwWlGJKu8pSXMrYqOKrdWA=="
  );
  async function encrypt(data) {
    const crypto = getCrypto();
    const subtle = getSubtle();
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    const hashValue = await hash.sha512bytes(
      concatArrayBuffers(await hash.sha512bytes(randomBytes), FIXED_STRING)
    );
    const k = hashValue.slice(0, 16);
    const iv = hashValue.slice(16, 32);
    const compressedData = await gzip(data);
    const hashedData = concatArrayBuffers(
      await hash.sha512bytes(compressedData),
      compressedData
    );
    const key = await subtle.importKey("raw", k, { name: "AES-CBC", length: 128 }, false, ["encrypt"]);
    const encryptedData = await subtle.encrypt({ name: "AES-CBC", iv }, key, hashedData);
    return concatArrayBuffers(
      new Uint8Array([116, 99, 5, 16, 0, 0]).buffer,
      randomBytes.buffer,
      encryptedData
    );
  }
  const ANDROID_VERSIONS = [
    { version: "9", api: 29 },
    { version: "10", api: 30 },
    { version: "11", api: 31 },
    { version: "12", api: 32 },
    { version: "13", api: 33 },
    { version: "14", api: 34 }
  ];
  const DEVICE_MODELS = [
    "RMX1931",
    "MI8",
    "Honor10",
    "P30",
    "V1921A",
    "Redmi Note 7",
    "Redmi K20 Pro",
    "MI 9",
    "Mi 10 Pro",
    "SM-G9750",
    "Pixel 6",
    "HD1910",
    "M2011K2C",
    "LIO-AN00",
    "VOG-TL00",
    "PCLM10",
    "GM1900",
    "Pixel 7 Pro",
    "Pixel 6a",
    "SM-N9760",
    "POCO F1"
  ];
  const DEVICE_BRANDS = [
    "realme",
    "Xiaomi",
    "Huawei",
    "OPPO",
    "vivo",
    "samsung",
    "OnePlus",
    "google",
    "Redmi",
    "HONOR",
    "motorola",
    "POCO"
  ];
  const HEX_LOW = "0123456789abcdef";
  const deviceValue = {
    aid: "1967",
    appName: "novelapp",
    channel: "0",
    platform: "android",
    osVersion: "0",
    versionCode: {
      str: "6.3.9.32",
      val: "63932"
    }
  };
  function randomInt(max) {
    return getCrypto().getRandomValues(new Uint32Array(1))[0] % max;
  }
  function randomItem(list) {
    return list[randomInt(list.length)];
  }
  function randomHex(k) {
    if (k <= 0) return "";
    const bytes = getCrypto().getRandomValues(new Uint8Array(k));
    let result = "";
    for (let i2 = 0; i2 < k; i2++) {
      result += HEX_LOW[bytes[i2] % 16];
    }
    return result;
  }
  function uuid() {
    const c = getCrypto();
    if (typeof c.randomUUID === "function") {
      return c.randomUUID();
    }
    const b = c.getRandomValues(new Uint8Array(16));
    b[6] = b[6] & 15 | 64;
    b[8] = b[8] & 63 | 128;
    const h2 = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
    return `${h2.slice(0, 8)}-${h2.slice(8, 12)}-${h2.slice(12, 16)}-${h2.slice(16, 20)}-${h2.slice(20)}`;
  }
  function ipv6LinkLocal() {
    return "::1";
  }
  function ipv6UniqueLocal() {
    const x = randomInt(1 << 8);
    let result = `fd${HEX_LOW[x >> 4]}${HEX_LOW[x & 15]}`;
    for (let i2 = 0; i2 < 7; i2++) {
      const v = randomInt(1 << 16);
      result += ":" + HEX_LOW[v >> 12 & 15] + HEX_LOW[v >> 8 & 15] + HEX_LOW[v >> 4 & 15] + HEX_LOW[v & 15];
    }
    return result;
  }
  function generateRequestBody() {
    const osInfo = randomItem(ANDROID_VERSIONS);
    const deviceBrand = randomItem(DEVICE_BRANDS);
    const genTime = Date.now();
    const romVersion = "coloros__" + randomHex(4).toUpperCase() + "." + String(randomInt(1e6)).padStart(6, "0") + "." + String(randomInt(1e8)).padStart(8, "0") + " release-keys";
    return {
      magic_tag: "ss_app_log",
      header: {
        display_name: "番茄免费小说",
        aid: 1967,
        channel: "43536163a",
        package: "com.dragon.read",
        sdk_version: "3.7.0-rc.25-fanqie-xiaoshuo",
        sdk_target_version: 29,
        git_hash: "711d1a7",
        density_dpi: 240,
        display_density: "hdpi",
        resolution: "720x1280",
        language: "zh",
        timezone: 8,
        access: "wifi",
        not_request_sender: 0,
        carrier: "CHINA MOBILE",
        mcc_mnc: "46000",
        region: "CN",
        tz_name: "Asia/Shanghai",
        tz_offset: 28800,
        sim_region: "cn",
        sim_serial_number: [],
        oaid_may_support: false,
        device_platform: "android",
        custom: { host_bit: 32, dragon_device_type: 0 },
        pre_installed_channel: "",
        is_system_app: 0,
        sdk_flavor: "china",
        guest_mode: 0,
        // 设备硬件与系统信息
        os: "Android",
        os_version: osInfo.version,
        os_api: osInfo.api,
        device_model: randomItem(DEVICE_MODELS),
        device_brand: deviceBrand,
        device_manufacturer: deviceBrand,
        cpu_abi: "arm64-v8a",
        release_build: randomHex(7),
        cdid: uuid(),
        sig_hash: "a4a27c2633195374c15651ffc3c4a497",
        openudid: randomHex(20),
        clientudid: uuid(),
        req_id: uuid(),
        // 可选字段
        rom: randomHex(14).toUpperCase(),
        rom_version: romVersion,
        apk_first_install_time: genTime - randomInt(365) * 864e5,
        ipv6_list: [
          { type: "client_anpi", value: ipv6LinkLocal() },
          { type: "client_anpi", value: ipv6UniqueLocal() },
          { type: "client_anpi", value: ipv6UniqueLocal() }
        ]
      },
      _gen_time: genTime
    };
  }
  const REGISTER_URL = "https://i.snssdk.com/service/2/device_register/?tt_data=a";
  const READING_BASE = "https://reading.snssdk.com";
  const USER_AGENT = "com.dragon.read";
  const APP_REQUEST = { credentials: "omit" };
  function buildQuery(device, versionCode, extra) {
    return new URLSearchParams({
      device_id: device.device_id,
      iid: device.install_id,
      device_type: device.device_type,
      aid: deviceValue.aid,
      app_name: deviceValue.appName,
      channel: deviceValue.channel,
      device_platform: deviceValue.platform,
      os_version: deviceValue.osVersion,
      version_code: versionCode,
      ...extra
    });
  }
  async function registerDevice() {
    const body = generateRequestBody();
    const encrypted = await encrypt(
      new TextEncoder().encode(JSON.stringify(body)).buffer
    );
    const res = await apiFetch(REGISTER_URL, {
      ...APP_REQUEST,
      method: "POST",
      headers: {
        "User-Agent": "okhttp/4.10.0",
        "Content-Type": "application/octet-stream; tt-data=a"
      },
      body: encrypted
    });
    if (res.status !== 200) {
      throw new Error(`设备注册失败: HTTP ${res.status} ${res.statusText}`);
    }
    const json = res.json();
    if (!(json == null ? void 0 : json.device_id) || !json.device_id_str || !json.install_id_str) {
      throw new Error(`设备注册失败: device_id 无效, 响应=${res.responseText}`);
    }
    const device = {
      device_id: json.device_id_str,
      install_id: json.install_id_str,
      device_type: body.header.device_model
    };
    console.log("设备注册成功！", device);
    return device;
  }
  async function activatePremium(device) {
    var _a;
    const url = `${READING_BASE}/reading/user/privilege/add/v?` + buildQuery(device, deviceValue.versionCode.val, {
      manifest_version_code: deviceValue.versionCode.val,
      update_version_code: deviceValue.versionCode.val
    }).toString();
    const body = `{"add_count_daily":0,"amount":2592000,"privilege_id":7210376203117531962,"from":8,"unique_key":"${Date.now()}"}`;
    try {
      const headers = await signRequest(url, body);
      const res = await apiFetch(url, {
        ...APP_REQUEST,
        method: "POST",
        headers: {
          ...headers,
          "User-Agent": USER_AGENT,
          "Content-Type": "application/json; charset=utf-8"
        },
        body
      });
      const json = res.json();
      if ((json == null ? void 0 : json.code) !== 0) {
        console.warn("设备会员激活失败:", res.responseText);
        return "";
      }
      const expireTime = ((_a = json.data) == null ? void 0 : _a.expire_time) ?? "";
      console.log("设备会员已成功激活！过期时间:", expireTime);
      return expireTime;
    } catch (e) {
      console.warn("设备会员激活失败:", e);
      return "";
    }
  }
  async function registerKey(device) {
    var _a, _b;
    const url = `${READING_BASE}/reading/crypt/registerkey?` + buildQuery(device, deviceValue.versionCode.str).toString();
    const idBytes = new Uint8Array(16);
    let id = BigInt(device.device_id);
    for (let i2 = 15; i2 >= 0; i2--) {
      idBytes[i2] = Number(id & 0xffn);
      id >>= 8n;
    }
    idBytes.reverse();
    const subtle = getSubtle();
    const iv = getCrypto().getRandomValues(new Uint8Array(16));
    const key = await subtle.importKey("raw", shared_key, { name: "AES-CBC" }, false, ["encrypt"]);
    const encrypted = new Uint8Array(
      await subtle.encrypt({ name: "AES-CBC", iv }, key, idBytes)
    );
    const content = new Uint8Array(iv.length + encrypted.length);
    content.set(iv);
    content.set(encrypted, iv.length);
    const plainBody = JSON.stringify({ content: b64encode(content.buffer) });
    const gzipped = await gzip(plainBody);
    const headers = await signRequest(url, gzipped);
    const res = await apiFetch(url, {
      ...APP_REQUEST,
      method: "POST",
      headers: {
        ...headers,
        "User-Agent": USER_AGENT,
        "Content-Type": "application/json; charset=utf-8",
        "Content-Encoding": "gzip"
      },
      body: gzipped
    });
    if (res.status !== 200) {
      throw new Error(`密钥注册失败: HTTP ${res.status} ${res.statusText}`);
    }
    const json = res.json();
    const encryptedKey = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.key;
    if (!encryptedKey) {
      throw new Error(`密钥注册失败: 响应缺少 key, 响应=${res.responseText}`);
    }
    const buf = b64decode(encryptedKey);
    const decryptKey = await subtle.importKey(
      "raw",
      shared_key,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );
    const finalKey = await subtle.decrypt(
      { name: "AES-CBC", iv: buf.slice(0, 16) },
      decryptKey,
      buf.slice(16)
    );
    const keyInfo = { key: finalKey, keyver: (_b = json.data) == null ? void 0 : _b.keyver };
    console.log("密钥获取成功，版本:", keyInfo.keyver, "key:", hex(finalKey));
    return keyInfo;
  }
  const STORE_KEY = "device";
  function load() {
    const s = read(STORE_KEY);
    if (!(s == null ? void 0 : s.device_id) || !(s == null ? void 0 : s.install_id)) return null;
    if (s.key) {
      if (!read("keyinfo")) {
        write("keyinfo", { key: s.key, keyver: s.keyver });
      }
      delete s.key;
      delete s.keyver;
      write(STORE_KEY, s);
    }
    return {
      device_id: s.device_id,
      install_id: s.install_id,
      device_type: s.device_type,
      device_brand: s.device_brand
    };
  }
  function save(c, vipExpireTime) {
    const s = {
      device_id: c.device_id,
      install_id: c.install_id,
      device_type: c.device_type,
      device_brand: c.device_brand,
      vip_expire_time: vipExpireTime
    };
    write(STORE_KEY, s);
  }
  async function provisionDevice() {
    const dev = await registerDevice();
    const vipExpireTime = await activatePremium(dev);
    const keyInfo = await registerKey(dev);
    const c = {
      device_id: dev.device_id,
      install_id: dev.install_id,
      device_type: dev.device_type,
      key_info: keyInfo
    };
    _config.currentConfig = c;
    save(c, vipExpireTime);
    write("keyinfo", {
      key: b64encode(keyInfo.key),
      keyver: keyInfo.keyver
    });
    return c;
  }
  async function ensureDevice() {
    const { deviceId, installId, deviceType } = settings$1;
    if (deviceId.trim() && installId.trim()) {
      const manual = {
        device_id: deviceId.trim(),
        install_id: installId.trim(),
        device_type: deviceType.trim() || void 0,
        // 手填设备没有密钥，正文接口会按需自行注册
        key_info: void 0
      };
      _config.currentConfig = manual;
      console.log("使用设置里手填的设备:", manual.device_id);
      return manual;
    }
    const cached = load();
    if (cached) {
      _config.currentConfig = cached;
      console.log("复用已缓存设备:", cached.device_id);
      return cached;
    }
    try {
      return await provisionDevice();
    } catch (e) {
      console.warn("设备注册失败，回退到内置匿名设备:", e);
      _config.currentConfig = defaultConfig;
      return defaultConfig;
    }
  }
  let replaceInflight = null;
  let unverified = false;
  function markDeviceHealthy() {
    unverified = false;
  }
  function replaceDevice() {
    if (replaceInflight) return replaceInflight;
    replaceInflight = doReplace().finally(() => {
      replaceInflight = null;
    });
    return replaceInflight;
  }
  async function doReplace() {
    if (unverified) {
      console.warn(
        "[fqa:device] 刚换过设备仍然收到空响应，问题多半不在设备（检查网络代理是否拦了 reading.snssdk.com）"
      );
      return null;
    }
    if (settings$1.deviceId.trim() && settings$1.installId.trim()) {
      console.warn("[fqa:device] 当前是手填设备，不自动替换。若接口持续失败，请到设置里清空或改用自动注册");
      return null;
    }
    unverified = true;
    console.warn("[fqa:device] 当前设备已被服务端作废，正在注册新设备…");
    try {
      del("keyinfo");
      _config.currentConfig.key_info = void 0;
      const c = await provisionDevice();
      console.log("[fqa:device] 已换到新设备:", c.device_id);
      return c;
    } catch (e) {
      console.error("[fqa:device] 注册新设备失败:", e);
      return null;
    }
  }
  const appBaseUrl = "https://reading.snssdk.com/reading";
  const appRootUrl = "https://reading.snssdk.com";
  const redcandleBaseUrl = "https://api5-sinfonlinec.jxbhmy.com/reading";
  const webBaseUrl = "https://fanqienovel.com/reading";
  const appUserAgent = "com.dragon.read";
  function buildAppQuery(extra) {
    const c = _config.currentConfig;
    return new URLSearchParams({
      iid: c.install_id,
      device_id: c.device_id,
      ac: "wifi",
      channel: "43536163a",
      aid: "1967",
      app_name: "novelapp",
      version_code: "70132",
      version_name: "7.0.1.32",
      device_platform: "android",
      os: "android",
      ssmix: "a",
      os_version: "10",
      device_type: c.device_type || "P30",
      device_brand: c.device_brand || "realme",
      update_version_code: "70132",
      manifest_version_code: "70132",
      pv_player: "70132",
      ...extra
    });
  }
  async function webGet(path, query, credentials2 = "omit") {
    const url = `${webBaseUrl}${path}?${buildAppQuery(query).toString()}`;
    const signed = await signRequest(url);
    const res = await fetch$1(url, { headers: signed, credentials: credentials2 });
    if (!res.ok) {
      throw new Error(`请求失败(${res.status})`);
    }
    return res.json();
  }
  function isUsable(res) {
    if (!res || res.status !== 200) return false;
    try {
      const j = res.json();
      return !j || j.code === void 0 || j.code === 0;
    } catch {
      return false;
    }
  }
  async function requestApp(path, query, headers) {
    const url = `${appBaseUrl}${path}?${buildAppQuery(query).toString()}`;
    const signed = await signRequest(url);
    return apiFetch(url, {
      method: "GET",
      headers: { ...signed, "User-Agent": appUserAgent, ...headers }
    });
  }
  async function requestRedcandle(path, query, headers) {
    const url = `${redcandleBaseUrl}${path}?${buildAppQuery(query).toString()}`;
    return apiFetch(url, {
      method: "GET",
      headers: { "User-Agent": appUserAgent, ...headers }
    });
  }
  async function requestAppWithRecovery(path, query, headers) {
    const res = await requestApp(path, query, headers);
    if (!isEmptyResponse(res)) {
      markDeviceHealthy();
      return res;
    }
    console.warn(`[fqa:api] ${path} 返回空响应体，判定当前设备已失效`);
    if (!await replaceDevice()) return res;
    const retry = await requestApp(path, query, headers);
    if (!isEmptyResponse(retry)) markDeviceHealthy();
    return retry;
  }
  async function appGet(path, query, headers) {
    if (settings$1.apiPreference === "redcandle") {
      try {
        const res = await requestRedcandle(path, query, headers);
        if (isUsable(res)) return res;
        console.warn(`[fqa:api] 红烛接口数据不全，回落到番茄 APP: ${path}`);
      } catch (e) {
        console.warn(`[fqa:api] 红烛接口请求失败，回落到番茄 APP: ${path}`, e);
      }
    }
    return requestAppWithRecovery(path, query, headers);
  }
  async function appPost(path, body, query, headers) {
    return postSigned(appBaseUrl + path, body, query, headers);
  }
  async function appRootPost(path, body, query, headers) {
    return postSigned(appRootUrl + path, body, query, headers);
  }
  async function postSigned(base, body, query, headers) {
    const url = `${base}?${buildAppQuery(query).toString()}`;
    const signed = await signRequest(url, body);
    console.log("---start--- APP POST ", url);
    const res = await apiFetch(url, {
      method: "POST",
      headers: {
        ...signed,
        "User-Agent": appUserAgent,
        "Content-Type": "application/json; charset=utf-8",
        ...headers
      },
      body
    });
    console.log("---complete--- APP POST ", url, res);
    return res;
  }
  async function decryptChapter(encrypted, rawData, config = defaultConfig) {
    var _a;
    if (!encrypted) {
      throw new Error("Invalid encrypted chapter");
    }
    const buf = b64decode(encrypted);
    const iv = buf.slice(0, 16);
    const data = buf.slice(16);
    const key = (_a = config.key_info) == null ? void 0 : _a.key;
    if (!key) {
      throw new Error("Missing decrypt key");
    }
    const subtle = getSubtle();
    const cryptoKey = await subtle.importKey(
      "raw",
      key,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );
    return subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      data
    ).then(async (decrypted) => {
      if (rawData && (rawData == null ? void 0 : rawData.compress_status) === 1) {
        decrypted = await gunzip(decrypted);
      }
      const decoder = new TextDecoder();
      const plain = decoder.decode(decrypted);
      if (plain.trim().startsWith("<")) {
        return plain;
      }
      try {
        return JSON.parse(plain);
      } catch (e) {
        console.warn("Invalid chapter content: ", plain, e);
        return void 0;
      }
    });
  }
  async function decryptComicImage(image, key) {
    const subtle = getSubtle();
    const cryptoKey = await subtle.importKey(
      "raw",
      unhex(key),
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    const iv = image.slice(0, 12);
    const data = image.slice(12);
    return await subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      data
    );
  }
  function reverseHex(value) {
    const be = BigInt(value).toString(16).padStart(32, "0");
    let result = "";
    for (let i2 = be.length; i2 > 0; i2 -= 2) result += be.slice(i2 - 2, i2);
    return result;
  }
  async function encryptKeyinfoBody(config) {
    const deviceId = config.device_id;
    const iv = new TextEncoder().encode(randomString(16));
    const data = new Uint8Array(unhex(reverseHex(deviceId))).slice(0, 8);
    console.log(data);
    const subtle = getSubtle();
    const k = await subtle.importKey(
      "raw",
      shared_key,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );
    const encrypted = await subtle.encrypt(
      { name: "AES-CBC", iv },
      k,
      data
    );
    const final = new Uint8Array(iv.length + encrypted.byteLength);
    console.log(final);
    final.set(iv, 0);
    final.set(new Uint8Array(encrypted), iv.length);
    return JSON.stringify({
      content: b64encode(final.buffer)
    });
  }
  async function decryptKeyinfoResponse(encrypted) {
    const buf = b64decode(encrypted);
    const iv = buf.slice(0, 16);
    const data = buf.slice(16);
    const subtle = getSubtle();
    const k = await subtle.importKey(
      "raw",
      shared_key,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );
    return subtle.decrypt(
      { name: "AES-CBC", iv },
      k,
      data
    );
  }
  async function refreshKeyinfo() {
    var _a, _b, _c;
    const b = await encryptKeyinfoBody(_config.currentConfig);
    const res = await appPost("/crypt/registerkey", b);
    const j = res.json();
    const ek = (_a = j == null ? void 0 : j.data) == null ? void 0 : _a.key;
    if (!ek) {
      throw new Error(`Failed to get key info: ${res.responseText}`);
    }
    const key = await decryptKeyinfoResponse(ek);
    const keyinfo = {
      key,
      keyver: (_b = j == null ? void 0 : j.data) == null ? void 0 : _b.keyver
    };
    console.log("Refreshed key info:", keyinfo);
    _config.currentConfig.key_info = keyinfo;
    write("keyinfo", {
      key: b64encode(key),
      keyver: (_c = j == null ? void 0 : j.data) == null ? void 0 : _c.keyver
    });
  }
  let refreshInflight = null;
  function refreshKey() {
    if (!refreshInflight) {
      refreshInflight = refreshKeyinfo().finally(() => {
        refreshInflight = null;
      });
    }
    return refreshInflight;
  }
  async function ensureKeyinfo(expectedKeyVersion) {
    const keyinfo = _config.currentConfig.key_info;
    const cachedKeyInfo = read("keyinfo");
    console.log("cached key info: ", cachedKeyInfo);
    if (cachedKeyInfo) {
      const cki = {
        key: b64decode(cachedKeyInfo.key),
        keyver: cachedKeyInfo.keyver
      };
      if (typeof expectedKeyVersion === "undefined" || cki.keyver === expectedKeyVersion) {
        _config.currentConfig.key_info = cki;
        return;
      }
    }
    if (!keyinfo) {
      return await refreshKey();
    }
    if ((keyinfo == null ? void 0 : keyinfo.keyver) !== expectedKeyVersion) {
      return await refreshKey();
    }
  }
  async function getChapter(itemId2, _retry) {
    var _a, _b;
    if (typeof _retry === "undefined") _retry = 0;
    if (_retry > 5) {
      throw new Error(`Failed to get chapter: ${itemId2}`);
    }
    if (!_config.currentConfig.key_info) {
      await ensureKeyinfo();
    }
    const res = await appGet("/reader/full/v", { item_id: itemId2, req_type: "1" });
    const j = (_a = res.json()) == null ? void 0 : _a.data;
    if (!j) {
      console.warn("Failed to get chapter: ", itemId2, ", response: ", res.responseText);
      return await getChapter(itemId2, _retry + 1);
    }
    if ((j == null ? void 0 : j.content) === "Invalid" || (j == null ? void 0 : j.key_version) !== ((_b = _config.currentConfig.key_info) == null ? void 0 : _b.keyver)) {
      console.warn("Key reg expired, regster again and retrying...");
      if ((j == null ? void 0 : j.content) === "Invalid") {
        await refreshKey();
      } else {
        await ensureKeyinfo(parseInt(j == null ? void 0 : j.key_version));
      }
      return await getChapter(itemId2, _retry + 1);
    }
    j.content = await decryptChapter(j == null ? void 0 : j.content, j, _config.currentConfig);
    return j;
  }
  async function getChapters(itemIds, bookId2 = "0", _retry = 0) {
    var _a, _b;
    if (itemIds.length === 0) return {};
    if (!_config.currentConfig.key_info) {
      await ensureKeyinfo();
    }
    const res = await appGet("/reader/batch_full/v", {
      item_ids: itemIds.join(","),
      book_id: bookId2,
      novel_text_type: "1",
      req_type: "1"
    });
    const raw = (_a = res.json()) == null ? void 0 : _a.data;
    const entries = raw && typeof raw === "object" ? Array.isArray(raw) ? raw.map((it) => {
      var _a2;
      return [String((it == null ? void 0 : it.item_id) ?? ((_a2 = it == null ? void 0 : it.novel_data) == null ? void 0 : _a2.item_id) ?? ""), it];
    }) : Object.entries(raw) : [];
    if (entries.length === 0) {
      throw new Error(`Failed to batch get chapters: ${res.responseText}`);
    }
    const localKeyver = (_b = _config.currentConfig.key_info) == null ? void 0 : _b.keyver;
    const expired = entries.filter(
      ([, item]) => (item == null ? void 0 : item.code) === 0 || (item == null ? void 0 : item.code) === void 0 ? (item == null ? void 0 : item.content) === "Invalid" || (item == null ? void 0 : item.key_version) !== void 0 && Number(item.key_version) !== localKeyver : false
    );
    if (expired.length > 0 && _retry < 2) {
      const [, sample] = expired[0];
      console.warn(
        `[fqa:api] 批量正文密钥失效（${expired.length}/${entries.length} 章），重新注册后重试。本地 keyver=${localKeyver}，服务端=${sample == null ? void 0 : sample.key_version}`
      );
      await refreshKey();
      await sleep(800);
      return await getChapters(itemIds, bookId2, _retry + 1);
    }
    const results = {};
    for (const [id, item] of entries) {
      if (!id) continue;
      if ((item == null ? void 0 : item.code) !== void 0 && item.code !== 0) {
        results[id] = { ...item, item_id: id, error: `code ${item.code}` };
        continue;
      }
      if (!(item == null ? void 0 : item.content) || item.content === "Invalid") {
        results[id] = { ...item, item_id: id, error: "Invalid content" };
        continue;
      }
      try {
        results[id] = {
          ...item,
          item_id: id,
          novel_data: item.novel_data,
          content: await decryptChapter(item.content, item, _config.currentConfig)
        };
      } catch (e) {
        results[id] = { ...item, item_id: id, error: String(e) };
      }
    }
    return results;
  }
  async function getCatalogRaw(bookId2) {
    var _a;
    const response = await appGet("/bookapi/directory/all_items/v", { book_id: bookId2 });
    const j = response.json();
    const items = (_a = j == null ? void 0 : j.data) == null ? void 0 : _a.item_data_list;
    if ((j == null ? void 0 : j.code) !== 0 || !Array.isArray(items) || items.length === 0) {
      return [null, null];
    }
    return [items, items.map((it) => String(it.item_id))];
  }
  async function webCatalog(bookId2) {
    const url = `https://fanqienovel.com/api/reader/directory/detail?bookId=${bookId2}`;
    const response = await apiFetch(url);
    const rj = response.json();
    const d = rj.data;
    const allItems = d.allItemIds;
    const cs = [];
    const vname = d.volumeNameList;
    for (let i2 = 0; i2 < vname.length; i2++) {
      const volumeName = vname[i2];
      if (volumeName !== void 0) {
        cs.push(...d.chapterListWithVolume[i2]);
      }
    }
    return [cs, allItems];
  }
  async function getCatalog(bookId2) {
    const r = await getCatalogRaw(bookId2);
    let catalogRaw = r[0];
    let allItemIds = r[1];
    console.log("catalogRaw", catalogRaw, "allItemIds", allItemIds);
    if (!catalogRaw || !allItemIds) {
      const rw = await webCatalog(bookId2);
      catalogRaw = rw[0];
      allItemIds = rw[1];
      console.log("webCatalog", catalogRaw, "allItemIds", allItemIds);
    }
    const vmap = {};
    const chapters = [];
    catalogRaw.forEach((item) => {
      const volumeName = item.volume_name ?? "";
      const chapterItem = {
        item_id: String(item.item_id || item.itemId),
        title: item.title,
        // YYYY-MM-DD HH:mm:ss
        update_time: moment((item.first_pass_time || item.firstPassTime) * 1e3).format("YYYY-MM-DD HH:mm:ss"),
        char_count: item.chapter_word_number || 0,
        volume_title: volumeName
      };
      chapters.push(chapterItem);
      if (!vmap[volumeName]) {
        vmap[volumeName] = {
          title: volumeName,
          book_id: bookId2,
          chapter_list: []
        };
      }
      vmap[volumeName].chapter_list.push(chapterItem);
    });
    return {
      book_id: bookId2,
      volume_list: Object.values(vmap),
      chapter_list: chapters,
      all_item_ids: allItemIds
    };
  }
  function mappingCreationStatus(status) {
    switch (status) {
      case "0":
        return "完结";
      case "1":
        return "连载";
      case "4":
        return "断更";
      default:
        return "未知";
    }
  }
  async function getBookInfoRaw(bookId2) {
    const response = await appGet("/bookapi/detail/v", { book_id: bookId2 });
    const j = response.json();
    console.log("Book Info:", j);
    return j.data;
  }
  async function getBookInfo(bookId2) {
    const bookInfo = await getBookInfoRaw(bookId2);
    if (!bookInfo) {
      throw new Error("Book not found");
    }
    return {
      book_id: bookInfo.book_id,
      title: bookInfo.book_name || bookInfo.original_book_name,
      author: bookInfo.author,
      cover_url: bookInfo.thumb_url,
      summary: bookInfo.abstract,
      // volume_list: bookInfo.volume_list,
      update_time: moment(bookInfo.last_chapter_first_pass_time * 1e3).format("YYYY-MM-DD HH:mm:ss"),
      status: mappingCreationStatus(bookInfo.creation_status)
      // chapter_count: bookInfo.chapter_count,
    };
  }
  async function getBookInfoAndCatalog(book) {
    if (typeof book !== "string") {
      book = book.book_id;
    }
    const bookInfo = await getBookInfo(book);
    if (!bookInfo) {
      throw new Error("Book not found");
    }
    const catalog = await getCatalog(bookInfo.book_id);
    console.log("Catalog:", catalog);
    bookInfo.volume_list = catalog.volume_list;
    bookInfo.chapter_list = catalog.chapter_list;
    return bookInfo;
  }
  const CDN_PREFIX = "https://p3-novel.byteimg.com/origin/";
  const cssCache = /* @__PURE__ */ new Map();
  function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
  }
  function scopeSelector(selector, scope) {
    const s = selector.trim();
    if (!s) return "";
    const where = `:where(${scope})`;
    if (/^(body|html|:root)$/i.test(s)) return where;
    const m = s.match(/^(body|html)\b([\s\S]*)$/i);
    if (m) return `${where}${m[2]}`;
    return `${where} ${s}`;
  }
  function stripRootDecls(body) {
    return body.split(";").filter((decl) => !/^\s*(color|background|background-color|font-size)\s*:/i.test(decl)).join(";");
  }
  function scopeCss(css, scope) {
    const src = stripComments(css);
    let out = "";
    let buf = "";
    let i2 = 0;
    while (i2 < src.length) {
      const ch = src[i2];
      if (ch === "{") {
        const prelude = buf.trim();
        buf = "";
        i2++;
        if (prelude.startsWith("@")) {
          if (/^@(media|supports|document)\b/i.test(prelude)) {
            const inner2 = readBlock(src, i2);
            out += `${prelude}{${scopeCss(inner2.text, scope)}}`;
            i2 = inner2.end;
          } else {
            const inner2 = readBlock(src, i2);
            out += `${prelude}{${inner2.text}}`;
            i2 = inner2.end;
          }
          continue;
        }
        const inner = readBlock(src, i2);
        const selectors = prelude.split(",").map((s) => scopeSelector(s, scope)).filter(Boolean);
        const isRoot = selectors.length === 1 && selectors[0] === `:where(${scope})`;
        const declarations = isRoot ? stripRootDecls(inner.text) : inner.text;
        if (selectors.length && declarations.trim()) {
          out += `${selectors.join(",")}{${declarations}}`;
        }
        i2 = inner.end;
        continue;
      }
      if (ch === ";" && buf.trim().startsWith("@")) {
        buf = "";
        i2++;
        continue;
      }
      buf += ch;
      i2++;
    }
    return out;
  }
  function readBlock(src, start) {
    let depth = 1;
    let i2 = start;
    while (i2 < src.length && depth > 0) {
      const c = src[i2];
      if (c === "{") depth++;
      else if (c === "}") depth--;
      if (depth === 0) break;
      i2++;
    }
    return { text: src.slice(start, i2), end: Math.min(i2 + 1, src.length) };
  }
  function parseCssMap(cssMap) {
    if (!cssMap || typeof cssMap !== "string") return {};
    try {
      const parsed = JSON.parse(cssMap);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }
  async function fetchCss(uri) {
    const cached = cssCache.get(uri);
    if (cached !== void 0) return cached;
    try {
      const res = await fetch(CDN_PREFIX + uri);
      const text = res.ok ? await res.text() : "";
      cssCache.set(uri, text);
      return text;
    } catch (e) {
      console.warn("获取书籍样式表失败:", uri, e);
      cssCache.set(uri, "");
      return "";
    }
  }
  async function getScopedBookCss(cssMap, scope) {
    const map = parseCssMap(cssMap);
    const uris = Object.values(map).filter(Boolean);
    if (uris.length === 0) return "";
    const sheets = await Promise.all(uris.map(fetchCss));
    return sheets.filter(Boolean).map((css) => scopeCss(css, scope)).join("\n");
  }
  async function applyBookCss(cssMap, scope, styleId = "fqa-book-style") {
    const css = await getScopedBookCss(cssMap, scope);
    let el = document.getElementById(styleId);
    if (!css) {
      el == null ? void 0 : el.remove();
      return false;
    }
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      document.head.appendChild(el);
    }
    el.textContent = css;
    return true;
  }
  const FOOTNOTE_CLASS = "fqa-footnote";
  const FOOTNOTE_REF_CLASS = "fqa-footnote-ref";
  const FOOTNOTE_LIST_CLASS = "fqa-footnote-list";
  function byAttr(root, tag, attr, value) {
    return [...root.querySelectorAll(tag)].filter((el) => {
      const v = el.getAttribute(attr);
      if (v === null) return false;
      return value === void 0 || v === value;
    });
  }
  function processFootnotes(root) {
    const notes = /* @__PURE__ */ new Map();
    const sections = byAttr(root, "section", "epub:type", "footnotes");
    for (const section of sections) {
      for (const aside of section.querySelectorAll("aside")) {
        const id = aside.getAttribute("id");
        if (id) notes.set(id, aside.innerHTML.trim());
      }
    }
    if (notes.size === 0) {
      for (const aside of byAttr(root, "aside", "epub:type", "footnote")) {
        const id = aside.getAttribute("id");
        if (id) notes.set(id, aside.innerHTML.trim());
      }
    }
    const collectRefs = (scope) => {
      const set = new Set(byAttr(scope, "a", "epub:type", "noteref"));
      for (const img of scope.querySelectorAll("img.bdFootnote")) {
        const a = img.closest('a[href^="#"]');
        if (a && scope.contains(a)) set.add(a);
      }
      return [...scope.querySelectorAll("a")].filter((a) => set.has(a));
    };
    const inSection = (el) => sections.some((s) => s.contains(el));
    const refs = collectRefs(root).filter((a) => !inSection(a));
    if (refs.length === 0 && notes.size === 0) return 0;
    const ordered = [];
    const numberOf = /* @__PURE__ */ new Map();
    let counter = 0;
    const makeSup = (num2, text) => {
      const sup = document.createElement("sup");
      sup.className = FOOTNOTE_REF_CLASS;
      sup.textContent = String(num2);
      sup.setAttribute("role", "button");
      sup.setAttribute("tabindex", "0");
      sup.title = stripTags(text);
      return sup;
    };
    refs.forEach((ref2) => {
      const href = ref2.getAttribute("href") ?? "";
      const id = href.startsWith("#") ? href.slice(1) : "";
      const text = notes.get(id);
      if (text === void 0) return;
      counter += 1;
      numberOf.set(id, counter);
      ordered.push({ num: counter, text });
      ref2.replaceWith(makeSup(counter, text));
    });
    for (const [id, text] of notes) {
      if (numberOf.has(id)) continue;
      counter += 1;
      numberOf.set(id, counter);
      ordered.push({ num: counter, text });
    }
    for (const section of sections) section.remove();
    if (ordered.length > 0) {
      const list = document.createElement("ol");
      list.className = FOOTNOTE_LIST_CLASS;
      for (const { num: num2, text } of ordered) {
        const li = document.createElement("li");
        li.id = `fqa-fn-${num2}`;
        li.innerHTML = text;
        for (const inner of collectRefs(li)) {
          const innerId = (inner.getAttribute("href") ?? "").replace(/^#/, "");
          const innerNum = numberOf.get(innerId);
          const innerText = notes.get(innerId);
          if (innerNum && innerText !== void 0) {
            inner.replaceWith(makeSup(innerNum, innerText));
          } else {
            inner.remove();
          }
        }
        list.appendChild(li);
      }
      const wrapper = document.createElement("section");
      wrapper.className = FOOTNOTE_CLASS;
      const heading = document.createElement("div");
      heading.className = "fqa-footnote-title";
      heading.textContent = "注释";
      wrapper.appendChild(heading);
      wrapper.appendChild(list);
      root.appendChild(wrapper);
    }
    for (const img of root.querySelectorAll("img.bdFootnote")) img.remove();
    return ordered.length;
  }
  function stripTags(html) {
    const el = document.createElement("div");
    el.innerHTML = html;
    return (el.textContent ?? "").replace(/\s+/g, " ").trim();
  }
  const KNOWN_TIERS = /muye-reader-content-(16|20|24|28|32)\b/;
  function syncFootnoteFontSize(container2) {
    const box = container2.closest('[class*="muye-reader-content-"]');
    const apply2 = () => {
      container2.style.removeProperty("--fqa-body-size");
      if (!box || KNOWN_TIERS.test(box.className)) return;
      const p = container2.querySelector("p");
      if (!p) return;
      const size = getComputedStyle(p).fontSize;
      if (size) container2.style.setProperty("--fqa-body-size", size);
    };
    apply2();
    if (!box) return;
    const holder = container2;
    if (holder.fqaFontObserver) return;
    const observer2 = new MutationObserver(apply2);
    observer2.observe(box, { attributes: true, attributeFilter: ["class"] });
    holder.fqaFontObserver = observer2;
  }
  function bindFootnoteInteraction(container2) {
    syncFootnoteFontSize(container2);
    if (container2.dataset.fqaFootnoteBound === "1") return;
    container2.dataset.fqaFootnoteBound = "1";
    const activate = (sup) => {
      var _a;
      const num2 = (_a = sup.textContent) == null ? void 0 : _a.trim();
      if (!num2) return;
      const target = container2.querySelector(`#fqa-fn-${num2}`);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("fqa-footnote-active");
      setTimeout(() => target.classList.remove("fqa-footnote-active"), 1600);
    };
    container2.addEventListener("click", (e) => {
      var _a, _b;
      const sup = (_b = (_a = e.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `.${FOOTNOTE_REF_CLASS}`);
      if (sup) {
        e.preventDefault();
        activate(sup);
      }
    });
    container2.addEventListener("keydown", (e) => {
      var _a, _b;
      const ke = e;
      if (ke.key !== "Enter" && ke.key !== " ") return;
      const sup = (_b = (_a = ke.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `.${FOOTNOTE_REF_CLASS}`);
      if (sup) {
        ke.preventDefault();
        activate(sup);
      }
    });
  }
  const leftIcon = '<?xml version="1.0" ?><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path fill="currentColor" d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z"/></g></svg>';
  const playingIcon = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\r\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\r\n\r\n<svg\r\n   xmlns:dc="http://purl.org/dc/elements/1.1/"\r\n   xmlns:cc="http://creativecommons.org/ns#"\r\n   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\r\n   xmlns:svg="http://www.w3.org/2000/svg"\r\n   xmlns="http://www.w3.org/2000/svg"\r\n   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\r\n   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\r\n   width="22"\r\n   height="22"\r\n   viewBox="0 0 5.8208332 5.8208335"\r\n   version="1.1"\r\n   id="svg8"\r\n   inkscape:version="0.92.2 (5c3e80d, 2017-08-06)"\r\n   sodipodi:docname="stock_media-pause.svg">\r\n  <defs\r\n     id="defs2" />\r\n  <sodipodi:namedview\r\n     id="base"\r\n     pagecolor="#ffffff"\r\n     bordercolor="#666666"\r\n     borderopacity="1.0"\r\n     inkscape:pageopacity="0.0"\r\n     inkscape:pageshadow="2"\r\n     inkscape:zoom="7.9999996"\r\n     inkscape:cx="7.3825825"\r\n     inkscape:cy="8.7516629"\r\n     inkscape:document-units="mm"\r\n     inkscape:current-layer="layer1"\r\n     showgrid="true"\r\n     units="px"\r\n     inkscape:window-width="1360"\r\n     inkscape:window-height="718"\r\n     inkscape:window-x="0"\r\n     inkscape:window-y="24"\r\n     inkscape:window-maximized="1">\r\n    <inkscape:grid\r\n       type="xygrid"\r\n       id="grid10"\r\n       spacingx="0.52916667"\r\n       spacingy="0.52916667" />\r\n  </sodipodi:namedview>\r\n  <metadata\r\n     id="metadata5">\r\n    <rdf:RDF>\r\n      <cc:Work\r\n         rdf:about="">\r\n        <dc:format>image/svg+xml</dc:format>\r\n        <dc:type\r\n           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\r\n        <dc:title></dc:title>\r\n      </cc:Work>\r\n    </rdf:RDF>\r\n  </metadata>\r\n  <g\r\n     inkscape:label="Capa 1"\r\n     inkscape:groupmode="layer"\r\n     id="layer1"\r\n     transform="translate(0,-291.17915)">\r\n    <path\r\n       style="fill:currentColor;fill-opacity:1;stroke:currentColor;stroke-width:1.29999995;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"\r\n       d="m 1.5875,292.23748 v 4.23334"\r\n       id="path892"\r\n       inkscape:connector-curvature="0" />\r\n    <path\r\n       inkscape:connector-curvature="0"\r\n       id="path894"\r\n       d="m 3.7041667,292.23748 v 4.23334"\r\n       style="fill:currentColor;fill-opacity:1;stroke:currentColor;stroke-width:1.29999995;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />\r\n  </g>\r\n</svg>\r\n';
  const pausedIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r\n    <g>\r\n        <path fill="none" d="M0 0h24v24H0z"/>\r\n        <path d="M16.394 12L10 7.737v8.526L16.394 12zm2.982.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" fill="currentColor"/>\r\n    </g>\r\n</svg>\r\n';
  function decodeBase36(c) {
    if (c >= 48 && c <= 57) return c - 48;
    if (c >= 97 && c <= 122) return c - 97 + 10;
    return 255;
  }
  function bitCount(n) {
    n = n - (n >> 1 & 1431655765);
    n = (n & 858993459) + (n >> 2 & 858993459);
    return (n + (n >> 4) & 252645135) * 16843009 >> 24;
  }
  function decryptSpadeInner(spadeKey) {
    const result = new Uint8Array(spadeKey);
    const buff = new Uint8Array(2 + spadeKey.length);
    buff.set([250, 85], 0);
    buff.set(spadeKey, 2);
    for (let i2 = 0; i2 < result.length; i2++) {
      let v = (spadeKey[i2] ^ buff[i2]) - bitCount(i2) - 21;
      while (v < 0) {
        v += 255;
      }
      result[i2] = v;
    }
    return result;
  }
  function decryptSpade(spadeKeyBytes) {
    const spadeKeyLen = spadeKeyBytes.length;
    if (spadeKeyLen < 3) return "";
    const paddingLen = (spadeKeyBytes[0] ^ spadeKeyBytes[1] ^ spadeKeyBytes[2]) - 48;
    if (spadeKeyLen < paddingLen + 2) return "";
    const innerInput = spadeKeyBytes.slice(1, spadeKeyLen - paddingLen);
    const tmpBuff = decryptSpadeInner(innerInput);
    if (tmpBuff.length === 0) return "";
    const skipBytes = decodeBase36(tmpBuff[0]);
    const decodedMessageLen = spadeKeyLen - paddingLen - 2;
    const endIndex = 1 + decodedMessageLen - skipBytes;
    if (endIndex > tmpBuff.length) return "";
    const finalBytes = tmpBuff.slice(1, endIndex);
    return new TextDecoder("utf-8").decode(finalBytes);
  }
  function decryptSpadeA(spadeAStr) {
    try {
      const bytes = new Uint8Array(b64decode(spadeAStr));
      return decryptSpade(bytes);
    } catch (e) {
      console.error("Spade parsing error", e);
      return "";
    }
  }
  async function getPlayInfo(item_id, tone_id) {
    const item_ids = Array.isArray(item_id) ? item_id.join(",") : item_id;
    const resp = await appGet("/reader/audio/playinfo/", {
      item_ids,
      tone_id: tone_id.toString()
    });
    const j = resp.json();
    const results = [];
    if (Array.isArray(j.data)) {
      for (let i2 of j.data) {
        results.push({
          urls: [i2.main_url, i2.backup_url].filter(Boolean),
          vid: i2.vid,
          key: i2.is_encrypt ? decryptSpadeA(i2.encryption_key) : "",
          item_id: i2.item_id
        });
      }
    }
    return results;
  }
  async function getBookAvailableTones(book_id) {
    var _a;
    const resp = await appGet("/bookapi/audio/toneinfo/", { book_id });
    const j = resp.json();
    const results = [];
    if (Array.isArray((_a = j == null ? void 0 : j.data) == null ? void 0 : _a.tts_tones)) {
      for (let i2 of j.data.tts_tones) {
        results.push({
          id: i2.id,
          name: i2.title,
          gender: i2.tone_gender,
          icon: i2.icon_url,
          description: i2.description
        });
      }
    }
    return results;
  }
  async function getChapterParagraphTimeTag(item_id, tone_id) {
    var _a;
    const resp = await appGet("/reader/audio/timepoint/", {
      item_id,
      tone_id: tone_id.toString(),
      req_type: "1"
    });
    const j = resp.json();
    const results = [];
    if (Array.isArray((_a = j == null ? void 0 : j.data) == null ? void 0 : _a.time_points)) {
      for (let i2 of j.data.time_points) {
        results.push({
          startms: i2.start_time,
          endms: i2.end_time,
          startidx: i2.start_para,
          endidx: i2.end_para,
          is_title: i2.start_para === 1e4
        });
      }
    }
    return results;
  }
  function asBytes(value) {
    if (value instanceof Uint8Array) {
      return new Uint8Array(value);
    }
    return new Uint8Array(value);
  }
  function concatBytes(...arrays) {
    const length = arrays.reduce((sum, array) => sum + array.byteLength, 0);
    const result = new Uint8Array(length);
    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.byteLength;
    }
    return result;
  }
  function ascii(text) {
    const result = new Uint8Array(text.length);
    for (let i2 = 0; i2 < text.length; i2++) {
      result[i2] = text.charCodeAt(i2) & 255;
    }
    return result;
  }
  function hexToBytes(text) {
    const hex2 = text.replace(/\s+/g, "");
    if (!/^[0-9a-fA-F]*$/.test(hex2) || hex2.length % 2 !== 0) {
      throw new Error("无效的十六进制数据");
    }
    const result = new Uint8Array(hex2.length / 2);
    for (let i2 = 0; i2 < result.length; i2++) {
      result[i2] = parseInt(hex2.slice(i2 * 2, i2 * 2 + 2), 16);
    }
    return result;
  }
  function uintBytes(value) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error(`无效的无符号整数: ${value}`);
    }
    if (value === 0) return new Uint8Array([0]);
    const result = [];
    let current = value;
    while (current > 0) {
      result.unshift(current & 255);
      current = Math.floor(current / 256);
    }
    return new Uint8Array(result);
  }
  function be16(value) {
    const result = new Uint8Array(2);
    new DataView(result.buffer).setUint16(0, value);
    return result;
  }
  function be32(value) {
    const result = new Uint8Array(4);
    new DataView(result.buffer).setUint32(0, value >>> 0);
    return result;
  }
  function be64(value) {
    const result = new Uint8Array(8);
    new DataView(result.buffer).setBigUint64(0, BigInt(value));
    return result;
  }
  function findBytes(buffer, fourcc, from = 0, to = buffer.length - 4) {
    if (fourcc.length !== 4) throw new Error(`fourcc 必须是 4 个字符: ${fourcc}`);
    const c0 = fourcc.charCodeAt(0);
    const c1 = fourcc.charCodeAt(1);
    const c2 = fourcc.charCodeAt(2);
    const c3 = fourcc.charCodeAt(3);
    for (let i2 = from; i2 <= to; i2++) {
      if (buffer[i2] === c0 && buffer[i2 + 1] === c1 && buffer[i2 + 2] === c2 && buffer[i2 + 3] === c3) return i2;
    }
    return -1;
  }
  function strBytes(text) {
    return new TextEncoder().encode(text);
  }
  function readFourcc(buffer, offset) {
    return String.fromCharCode(
      buffer[offset] ?? 0,
      buffer[offset + 1] ?? 0,
      buffer[offset + 2] ?? 0,
      buffer[offset + 3] ?? 0
    );
  }
  const CONTAINERS = /* @__PURE__ */ new Set([
    "moov",
    "trak",
    "mdia",
    "minf",
    "stbl",
    "edts",
    "dinf",
    "udta",
    "mvex",
    "meta"
  ]);
  function readBox(buffer, offset, limit) {
    if (offset + 8 > limit) return null;
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const size32 = view.getUint32(offset);
    const type = readFourcc(buffer, offset + 4);
    let headerSize = 8;
    let size;
    if (size32 === 1) {
      if (offset + 16 > limit) return null;
      const extended = view.getBigUint64(offset + 8);
      if (extended > BigInt(Number.MAX_SAFE_INTEGER)) {
        throw new Error(`MP4 box 过大: ${type}`);
      }
      size = Number(extended);
      headerSize = 16;
    } else if (size32 === 0) {
      size = limit - offset;
    } else {
      size = size32;
    }
    if (size < headerSize || offset + size > limit) return null;
    return { type, offset, size, headerSize, end: offset + size };
  }
  function walkBoxes(buffer, start, end, visit, depth = 0) {
    if (depth > 16) return;
    let offset = start;
    while (offset + 8 <= end) {
      const box = readBox(buffer, offset, end);
      if (!box) return;
      visit(box);
      if (CONTAINERS.has(box.type)) {
        const childStart = box.offset + box.headerSize + (box.type === "meta" ? 4 : 0);
        if (childStart < box.end) walkBoxes(buffer, childStart, box.end, visit, depth + 1);
      }
      offset = box.end;
    }
  }
  function findBox(boxes, type) {
    return boxes.find((box) => box.type === type);
  }
  function findMdatStart(buffer) {
    let offset = 0;
    while (offset + 8 <= buffer.length) {
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      const size32 = view.getUint32(offset);
      const type = readFourcc(buffer, offset + 4);
      const headerSize = size32 === 1 ? 16 : 8;
      if (type === "mdat") return offset + headerSize;
      if (size32 === 0) return -1;
      if (size32 === 1) {
        if (offset + 16 > buffer.length) return -1;
        const size = view.getBigUint64(offset + 8);
        if (size > BigInt(Number.MAX_SAFE_INTEGER)) return -1;
        offset += Number(size);
      } else {
        offset += size32;
      }
    }
    return -1;
  }
  function parseSampleSizes(box, view) {
    if (box.offset + 20 > box.end) throw new Error("stsz box 不完整");
    const sampleSize = view.getUint32(box.offset + 12);
    const count = view.getUint32(box.offset + 16);
    const sizes = new Uint32Array(count);
    if (sampleSize !== 0) {
      sizes.fill(sampleSize);
      return sizes;
    }
    if (box.offset + 20 + count * 4 > box.end) throw new Error("stsz 采样表不完整");
    for (let i2 = 0; i2 < count; i2++) sizes[i2] = view.getUint32(box.offset + 20 + i2 * 4);
    return sizes;
  }
  function parseDurations(box, sampleCount, view) {
    if (box.offset + 16 > box.end) throw new Error("stts box 不完整");
    const entryCount = view.getUint32(box.offset + 12);
    const durations = new Uint32Array(sampleCount);
    let index = 0;
    for (let i2 = 0; i2 < entryCount; i2++) {
      const offset = box.offset + 16 + i2 * 8;
      if (offset + 8 > box.end) throw new Error("stts 采样表不完整");
      const count = view.getUint32(offset);
      const duration = view.getUint32(offset + 4);
      for (let j = 0; j < count && index < sampleCount; j++) durations[index++] = duration;
    }
    if (index !== sampleCount) throw new Error(`stts 采样数不一致: ${index}/${sampleCount}`);
    return durations;
  }
  function parseIvs(box, sampleCount, view) {
    if (box.offset + 16 > box.end) throw new Error("senc box 不完整");
    const flags = view.getUint32(box.offset + 8) & 16777215;
    if ((flags & 2) !== 0) throw new Error("暂不支持带 subsample encryption 的音频");
    const count = view.getUint32(box.offset + 12);
    if (count !== sampleCount) throw new Error(`senc 采样数不一致: ${count}/${sampleCount}`);
    const dataStart = box.offset + 16;
    const dataLength = box.end - dataStart;
    if (count === 0 || dataLength % count !== 0) throw new Error("senc IV 表不完整");
    const ivLength = dataLength / count;
    if (ivLength !== 8 && ivLength !== 16) throw new Error(`不支持的 CENC IV 长度: ${ivLength}`);
    return asBytes(new Uint8Array(view.buffer, view.byteOffset + dataStart, dataLength));
  }
  function parseTimescale(box, view) {
    if (box.offset + 24 > box.end) throw new Error("mdhd box 不完整");
    const version2 = view.getUint8(box.offset + 8);
    const offset = version2 === 1 ? box.offset + 28 : box.offset + 20;
    if (offset + 4 > box.end) throw new Error("mdhd timescale 缺失");
    const timescale = view.getUint32(offset);
    if (timescale === 0) throw new Error("MP4 timescale 为 0");
    return timescale;
  }
  function parseCodec(buffer, mdatStart) {
    const end = Math.max(0, Math.min(mdatStart - 1, buffer.length - 4));
    const dOps = findBytes(buffer, "dOps", 0, end);
    if (dOps >= 0) {
      const channels2 = buffer[dOps + 5] ?? 1;
      const preSkip = (buffer[dOps + 6] ?? 0) << 8 | (buffer[dOps + 7] ?? 0);
      return { codec: "opus", channels: channels2, preSkip };
    }
    const encodedEntry = findBytes(buffer, "enca", 0, end);
    const plainEntry = findBytes(buffer, "mp4a", 0, end);
    const entryType = encodedEntry >= 0 ? encodedEntry : plainEntry;
    const channels = entryType >= 0 && entryType + 22 <= buffer.length ? new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).getUint16(entryType + 20) : 1;
    if (findBytes(buffer, "dfLa", 0, end) >= 0) {
      return { codec: "flac", channels: channels || 1, preSkip: 0 };
    }
    if (entryType >= 0) {
      return { codec: "aac", channels: channels || 1, preSkip: 0 };
    }
    throw new Error("未识别的音频编码（需要 Opus、AAC 或 FLAC）");
  }
  function parseCencMetadata(head) {
    const mdatStart = findMdatStart(head);
    if (mdatStart < 0) throw new Error("未找到 mdat，MP4 头可能尚未拉完整");
    const boxes = [];
    walkBoxes(head, 0, Math.min(mdatStart - 8, head.length), (box) => boxes.push(box));
    const stsz = findBox(boxes, "stsz");
    const stts = findBox(boxes, "stts");
    const senc = findBox(boxes, "senc");
    const mdhd = findBox(boxes, "mdhd");
    if (!stsz || !stts || !senc || !mdhd) {
      throw new Error("CENC MP4 头缺少 stsz/stts/senc/mdhd");
    }
    const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
    const sizes = parseSampleSizes(stsz, view);
    const durations = parseDurations(stts, sizes.length, view);
    const ivs = parseIvs(senc, sizes.length, view);
    const timescale = parseTimescale(mdhd, view);
    const codec = parseCodec(head, mdatStart);
    const offsets = new Float64Array(sizes.length + 1);
    for (let i2 = 0; i2 < sizes.length; i2++) {
      offsets[i2 + 1] = offsets[i2] + sizes[i2];
      if (!Number.isSafeInteger(offsets[i2 + 1])) throw new Error("音频采样数据超过 JavaScript 安全整数范围");
    }
    let totalTicks = 0;
    for (const duration of durations) {
      totalTicks += duration;
      if (!Number.isSafeInteger(totalTicks)) throw new Error("音频总时长超过 JavaScript 安全整数范围");
    }
    return {
      ...codec,
      sampleCount: sizes.length,
      sizes,
      ivs,
      durations,
      timescale,
      mdatStart,
      offsets,
      totalTicks
    };
  }
  function cencIvSize(meta) {
    return meta.ivs.length / meta.sampleCount;
  }
  function normalizeCencKey(value) {
    if (typeof value === "string") {
      const bytes2 = hexToBytes(value);
      if (bytes2.length !== 16) throw new Error("AES-128 key 必须是 32 位 hex");
      return bytes2;
    }
    const bytes = asBytes(value);
    if (bytes.length !== 16) throw new Error("AES-128 key 必须是 16 字节");
    return bytes.slice();
  }
  async function importCencKey(value) {
    return getSubtle().importKey(
      "raw",
      normalizeCencKey(value),
      { name: "AES-CTR" },
      false,
      ["decrypt"]
    );
  }
  function makeCencCounter(iv, counterStart) {
    if (iv.length !== 8 && iv.length !== 16) throw new Error(`无效的 CENC IV 长度: ${iv.length}`);
    const counter = new Uint8Array(16);
    counter.set(iv);
    if (counterStart === 1) counter[15] = 1;
    return counter;
  }
  async function decryptCencSample(key, iv, ciphertext, counterStart) {
    const data = asBytes(ciphertext);
    const plain = await getSubtle().decrypt(
      { name: "AES-CTR", counter: makeCencCounter(iv, counterStart), length: 64 },
      key,
      data
    );
    return new Uint8Array(plain);
  }
  function ebmlVint(value, length) {
    if (!Number.isSafeInteger(value) || value < 0 || length < 1 || length > 8) {
      throw new Error(`无效的 EBML VINT: ${value}`);
    }
    const result = new Uint8Array(length);
    result[0] = 128 >> length - 1;
    let current = value;
    for (let i2 = length - 1; i2 > 0; i2--) {
      result[i2] = current & 255;
      current = Math.floor(current / 256);
    }
    const max = Math.pow(2, 7 * length);
    if (current >= max) throw new Error(`EBML VINT 溢出: ${value}`);
    result[0] |= current;
    return result;
  }
  function ebmlSize(value) {
    for (let length = 1; length <= 8; length++) {
      if (value < Math.pow(2, 7 * length) - 1) return ebmlVint(value, length);
    }
    throw new Error(`EBML size 过大: ${value}`);
  }
  function ebmlElement(id, payload) {
    return concatBytes(hexToBytes(id), ebmlSize(payload.length), payload);
  }
  function mp4Box(type, payload) {
    return concatBytes(be32(8 + payload.length), ascii(type), payload);
  }
  function matrixIdentity() {
    const matrix = new Uint8Array(36);
    const view = new DataView(matrix.buffer);
    view.setUint32(0, 65536);
    view.setUint32(16, 65536);
    view.setUint32(32, 1073741824);
    return matrix;
  }
  function signedBe16(value) {
    const result = new Uint8Array(2);
    new DataView(result.buffer).setInt16(0, value);
    return result;
  }
  function buildWebmInit(channels, preSkip, durationSeconds) {
    const ebml = ebmlElement("1A45DFA3", concatBytes(
      ebmlElement("4286", hexToBytes("01")),
      ebmlElement("42F7", hexToBytes("01")),
      ebmlElement("42F2", hexToBytes("04")),
      ebmlElement("42F3", hexToBytes("08")),
      ebmlElement("4282", strBytes("webm")),
      ebmlElement("4287", hexToBytes("04")),
      ebmlElement("4285", hexToBytes("02"))
    ));
    const codecDelayNs = Math.round(preSkip * 1e9 / 48e3);
    const duration = new Uint8Array(8);
    new DataView(duration.buffer).setFloat64(0, durationSeconds, false);
    const info = ebmlElement("1549A966", concatBytes(
      ebmlElement("2AD7B1", uintBytes(1e6)),
      ebmlElement("4489", duration),
      ebmlElement("4D80", strBytes("clearKeyStreamer")),
      ebmlElement("5741", strBytes("clearKeyStreamer"))
    ));
    const sampleRate = new Uint8Array(4);
    new DataView(sampleRate.buffer).setFloat32(0, 48e3, false);
    const audio2 = ebmlElement("E1", concatBytes(
      ebmlElement("B5", sampleRate),
      ebmlElement("9F", uintBytes(channels))
    ));
    const track = ebmlElement("AE", concatBytes(
      ebmlElement("D7", hexToBytes("01")),
      ebmlElement("73C5", uintBytes(1)),
      ebmlElement("83", hexToBytes("02")),
      ebmlElement("86", strBytes("A_OPUS")),
      ebmlElement("63A2", buildOpusHead(channels, preSkip)),
      ebmlElement("56AA", uintBytes(codecDelayNs)),
      ebmlElement("56BB", uintBytes(8e7)),
      audio2
    ));
    const tracks = ebmlElement("1654AE6B", track);
    return concatBytes(ebml, hexToBytes("18538067"), hexToBytes("01FFFFFFFFFFFFFF"), info, tracks);
  }
  function buildOpusHead(channels, preSkip) {
    const head = new Uint8Array(19);
    head.set([79, 112, 117, 115, 72, 101, 97, 100], 0);
    const view = new DataView(head.buffer);
    head[8] = 1;
    head[9] = channels;
    view.setUint16(10, preSkip, true);
    view.setUint32(12, 48e3, true);
    view.setInt16(16, 0, true);
    head[18] = 0;
    return head;
  }
  function buildWebmCluster(baseMs, relativeMs, packets) {
    if (relativeMs.length !== packets.length) throw new Error("WebM 时间戳和采样数不一致");
    const blocks = [];
    for (let i2 = 0; i2 < packets.length; i2++) {
      const relative = relativeMs[i2];
      if (relative === void 0 || relative < -32768 || relative > 32767) {
        throw new Error(`WebM 相对时间戳超出 Int16: ${relative}`);
      }
      const trackAndFlags = new Uint8Array([129, 128]);
      blocks.push(ebmlElement("A3", concatBytes(
        trackAndFlags.slice(0, 1),
        signedBe16(relative),
        trackAndFlags.slice(1),
        packets[i2]
      )));
    }
    return ebmlElement("1F43B675", concatBytes(
      ebmlElement("E7", uintBytes(baseMs)),
      concatBytes(...blocks)
    ));
  }
  function replaceFourcc(buffer, offset, type) {
    buffer.set(ascii(type), offset);
  }
  function extractSampleEntry(head, mdatStart) {
    const encoded = findBytes(head, "enca", 0, mdatStart - 1);
    const plain = findBytes(head, "mp4a", 0, mdatStart - 1);
    const typeOffset = encoded >= 0 ? encoded : plain;
    if (typeOffset < 4) throw new Error("未找到 AAC 音频采样入口");
    const entryOffset = typeOffset - 4;
    const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
    const size = view.getUint32(entryOffset);
    if (size < 8 || entryOffset + size > head.length) throw new Error("AAC 采样入口不完整");
    const entry = new Uint8Array(head.slice(entryOffset, entryOffset + size));
    const enca = findBytes(entry, "enca", 0);
    if (enca >= 0) replaceFourcc(entry, enca, "mp4a");
    const sinf = findBytes(entry, "sinf", 8);
    if (sinf >= 0) replaceFourcc(entry, sinf, "free");
    return entry;
  }
  function extractFlacEntry(head, mdatStart) {
    const encoded = findBytes(head, "enca", 0, mdatStart - 1);
    if (encoded < 4) throw new Error("未找到 FLAC 加密采样入口");
    const entryOffset = encoded - 4;
    const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
    const size = view.getUint32(entryOffset);
    if (size < 8 || entryOffset + size > head.length) throw new Error("FLAC 采样入口不完整");
    const entry = new Uint8Array(head.slice(entryOffset, entryOffset + size));
    replaceFourcc(entry, encoded - entryOffset, "fLaC");
    const sinf = findBytes(entry, "sinf", 8);
    if (sinf >= 0) replaceFourcc(entry, sinf, "free");
    return entry;
  }
  function buildMp4Init(sampleEntry, timescale, totalTicks) {
    const totalSeconds = totalTicks / timescale;
    const matrix = matrixIdentity();
    const mvhd = mp4Box("mvhd", concatBytes(
      be32(0),
      be32(0),
      be32(0),
      be32(1e3),
      be32(Math.round(totalSeconds * 1e3)),
      be32(65536),
      be16(256),
      be16(0),
      new Uint8Array(8),
      matrix,
      new Uint8Array(24),
      be32(2)
    ));
    const tkhd = mp4Box("tkhd", concatBytes(
      be32(7),
      be32(0),
      be32(0),
      be32(1),
      be32(0),
      be32(0),
      new Uint8Array(8),
      be16(0),
      be16(0),
      be16(256),
      be16(0),
      matrix,
      be32(0),
      be32(0)
    ));
    const mdhd = mp4Box("mdhd", concatBytes(
      be32(0),
      be32(0),
      be32(0),
      be32(timescale),
      be32(totalTicks),
      be16(21956),
      be16(0)
    ));
    const hdlr = mp4Box("hdlr", concatBytes(
      be32(0),
      be32(0),
      ascii("soun"),
      new Uint8Array(12)
    ));
    const smhd = mp4Box("smhd", concatBytes(be32(0), be16(0), be16(0)));
    const url = mp4Box("url ", be32(1));
    const dref = mp4Box("dref", concatBytes(be32(0), be32(1), url));
    const dinf = mp4Box("dinf", dref);
    const stsd = mp4Box("stsd", concatBytes(be32(0), be32(1), sampleEntry));
    const stts = mp4Box("stts", concatBytes(be32(0), be32(0)));
    const stsc = mp4Box("stsc", concatBytes(be32(0), be32(0)));
    const stsz = mp4Box("stsz", concatBytes(be32(0), be32(0), be32(0)));
    const stco = mp4Box("stco", concatBytes(be32(0), be32(0)));
    const stbl = mp4Box("stbl", concatBytes(stsd, stts, stsc, stsz, stco));
    const minf = mp4Box("minf", concatBytes(smhd, dinf, stbl));
    const mdia = mp4Box("mdia", concatBytes(mdhd, hdlr, minf));
    const trak = mp4Box("trak", concatBytes(tkhd, mdia));
    const trex = mp4Box("trex", concatBytes(be32(0), be32(1), be32(1), be32(0), be32(0), be32(0)));
    const mvex = mp4Box("mvex", trex);
    const moov = mp4Box("moov", concatBytes(mvhd, trak, mvex));
    const ftyp = mp4Box("ftyp", concatBytes(ascii("isom"), be32(512), ascii("isomiso2mp41dash")));
    return concatBytes(ftyp, moov);
  }
  function buildMp4Segment(baseDecodeTick, samples, sequence) {
    if (samples.length === 0) throw new Error("MP4 segment 不能没有采样");
    const sampleTable = samples.flatMap((sample) => [be32(sample.duration), be32(sample.data.length)]);
    const mfhd = mp4Box("mfhd", concatBytes(be32(0), be32(sequence)));
    const tfhd = mp4Box("tfhd", concatBytes(be32(131072), be32(1)));
    const tfdt = mp4Box("tfdt", concatBytes(be32(16777216), be64(baseDecodeTick)));
    const makeTrun = (offset) => mp4Box("trun", concatBytes(
      be32(769),
      be32(samples.length),
      be32(offset),
      concatBytes(...sampleTable)
    ));
    const makeMoof = (offset) => mp4Box("moof", concatBytes(
      mfhd,
      mp4Box("traf", concatBytes(tfhd, tfdt, makeTrun(offset)))
    ));
    const mediaPayload = concatBytes(...samples.map((sample) => sample.data));
    const dataOffset = makeMoof(0).length + 8;
    return concatBytes(makeMoof(dataOffset), mp4Box("mdat", mediaPayload));
  }
  function codecMime(codec) {
    if (codec === "opus") return 'audio/webm;codecs="opus"';
    if (codec === "flac") return 'audio/mp4; codecs="fLaC"';
    return 'audio/mp4; codecs="mp4a.40.2"';
  }
  function initSegment(meta, sampleEntry) {
    if (meta.codec === "opus") {
      const playableTicks = Math.max(0, meta.totalTicks - meta.preSkip);
      return buildWebmInit(meta.channels, meta.preSkip, playableTicks / meta.timescale);
    }
    if (!sampleEntry) throw new Error("MP4 编码缺少 sample entry");
    return buildMp4Init(sampleEntry, meta.timescale, meta.totalTicks);
  }
  const DEFAULT_HEAD_BYTES = 512 * 1024;
  const DEFAULT_MAX_HEAD_BYTES = 8 * 1024 * 1024;
  const DEFAULT_SEGMENT_SECONDS = 15;
  const MAX_WEBM_SEGMENT_SECONDS = 30;
  const DEFAULT_MAX_BUFFER_AHEAD = 40;
  const DEFAULT_KEEP_BEHIND = 10;
  const DEFAULT_DECRYPT_CONCURRENCY = 24;
  function asError(value) {
    return value instanceof Error ? value : new Error(String(value));
  }
  function abortError$1() {
    return new DOMException("播放器会话已取消", "AbortError");
  }
  function isAbort(value) {
    return value instanceof DOMException && value.name === "AbortError";
  }
  function waitForSourceBufferIdle(sourceBuffer, signal) {
    if (!sourceBuffer.updating) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => {
        sourceBuffer.removeEventListener("updateend", done);
        sourceBuffer.removeEventListener("abort", done);
        sourceBuffer.removeEventListener("error", done);
        signal.removeEventListener("abort", done);
        resolve();
      };
      sourceBuffer.addEventListener("updateend", done);
      sourceBuffer.addEventListener("abort", done);
      sourceBuffer.addEventListener("error", done);
      signal.addEventListener("abort", done, { once: true });
    });
  }
  function describeMediaError(audio2) {
    const error = audio2.error;
    if (!error) return "";
    const names = {
      1: "MEDIA_ERR_ABORTED",
      2: "MEDIA_ERR_NETWORK",
      3: "MEDIA_ERR_DECODE（数据不是合法音频，多半在传输中被破坏）",
      4: "MEDIA_ERR_SRC_NOT_SUPPORTED"
    };
    const name2 = names[error.code] ?? `code ${error.code}`;
    return `：${name2}${error.message ? ` - ${error.message}` : ""}`;
  }
  function validatePositive(value, fallback, name2) {
    const result = value ?? fallback;
    if (!Number.isFinite(result) || result <= 0) throw new Error(`${name2} 必须是正数`);
    return result;
  }
  async function mapLimit(items, limit, worker) {
    const results = new Array(items.length);
    let next = 0;
    async function consume() {
      while (next < items.length) {
        const index = next++;
        results[index] = await worker(items[index]);
      }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => consume()));
    return results;
  }
  class SequentialByteStream {
    constructor(initial = new Uint8Array(), reader = null, openReader = null) {
      __publicField(this, "chunks", []);
      __publicField(this, "chunkOffset", 0);
      __publicField(this, "available", 0);
      __publicField(this, "reader");
      __publicField(this, "openReader");
      __publicField(this, "eof", false);
      if (initial.length > 0) {
        const copy = new Uint8Array(initial);
        this.chunks.push(copy);
        this.available = copy.length;
      }
      this.reader = reader;
      this.openReader = openReader;
    }
    /** 至少缓存 length 字节；流先结束时返回 false。 */
    async bufferAtLeast(length) {
      while (this.available < length && !this.eof) await this.pull();
      return this.available >= length;
    }
    /** 复制当前全部未消费数据，不移动读取位置。 */
    snapshot() {
      const result = new Uint8Array(this.available);
      let output = 0;
      for (let i2 = 0; i2 < this.chunks.length; i2++) {
        const chunk2 = this.chunks[i2];
        const start = i2 === 0 ? this.chunkOffset : 0;
        result.set(chunk2.subarray(start), output);
        output += chunk2.length - start;
      }
      return result;
    }
    async skip(length) {
      await this.readExactly(length);
    }
    async readExactly(length) {
      if (!Number.isSafeInteger(length) || length < 0) {
        throw new Error(`无效的流读取长度: ${length}`);
      }
      if (length === 0) return new Uint8Array();
      if (!await this.bufferAtLeast(length)) {
        throw new Error(`音频流提前结束（还需 ${length - this.available} 字节）`);
      }
      const result = new Uint8Array(length);
      let output = 0;
      while (output < length) {
        const chunk2 = this.chunks[0];
        const take = Math.min(length - output, chunk2.length - this.chunkOffset);
        result.set(chunk2.subarray(this.chunkOffset, this.chunkOffset + take), output);
        output += take;
        this.chunkOffset += take;
        this.available -= take;
        if (this.chunkOffset === chunk2.length) {
          this.chunks.shift();
          this.chunkOffset = 0;
        }
      }
      return result;
    }
    async cancel() {
      var _a;
      this.eof = true;
      try {
        await ((_a = this.reader) == null ? void 0 : _a.cancel());
      } catch {
      }
      this.reader = null;
    }
    async pull() {
      if (!this.reader && this.openReader) this.reader = await this.openReader();
      if (!this.reader) {
        this.eof = true;
        return;
      }
      const { value, done } = await this.reader.read();
      if (done) {
        this.eof = true;
        return;
      }
      if (value == null ? void 0 : value.length) {
        const copy = new Uint8Array(value);
        this.chunks.push(copy);
        this.available += copy.length;
      }
    }
  }
  class CencAudioPlayer {
    constructor(audio2, options = {}) {
      __publicField(this, "audio");
      __publicField(this, "options");
      __publicField(this, "state", "idle");
      __publicField(this, "session", 0);
      __publicField(this, "streamToken", 0);
      __publicField(this, "seekToken", 0);
      __publicField(this, "sessionController", null);
      __publicField(this, "streamController", null);
      __publicField(this, "sourceBuffer", null);
      __publicField(this, "mediaSource", null);
      __publicField(this, "objectUrl", null);
      __publicField(this, "sourceBufferChain", Promise.resolve());
      __publicField(this, "context", null);
      __publicField(this, "info", null);
      __publicField(this, "autoplay", false);
      __publicField(this, "segmentSequence", 0);
      /** 播放倍速。预缓冲目标按它缩放，避免高倍速时缓冲不够 */
      __publicField(this, "playbackRate", 1);
      __publicField(this, "onSeeking", () => {
        const context = this.context;
        if (!context || this.state === "destroyed" || this.session === 0) return;
        if (this.audio.error) return;
        const target = this.audio.currentTime;
        if (!Number.isFinite(target) || this.isTimeBuffered(target)) return;
        const wasPlaying = !this.audio.paused;
        void this.restartAt(target, wasPlaying);
      });
      __publicField(this, "onPlay", () => {
        if (this.context && this.state !== "destroyed") this.emitState("playing");
      });
      __publicField(this, "onPause", () => {
        if (this.context && this.state === "playing" && !this.audio.ended) this.emitState("paused");
      });
      __publicField(this, "onEnded", () => {
        if (this.context && this.state !== "destroyed") this.emitState("ended");
      });
      this.audio = audio2;
      const fetcher = (options.fetch ?? fetch$1).bind(unsafeWindow);
      this.options = {
        headBytes: validatePositive(options.headBytes, DEFAULT_HEAD_BYTES, "headBytes"),
        maxHeadBytes: validatePositive(options.maxHeadBytes, DEFAULT_MAX_HEAD_BYTES, "maxHeadBytes"),
        segmentSeconds: validatePositive(options.segmentSeconds, DEFAULT_SEGMENT_SECONDS, "segmentSeconds"),
        maxBufferAheadSeconds: validatePositive(options.maxBufferAheadSeconds, DEFAULT_MAX_BUFFER_AHEAD, "maxBufferAheadSeconds"),
        keepBehindSeconds: validatePositive(options.keepBehindSeconds, DEFAULT_KEEP_BEHIND, "keepBehindSeconds"),
        decryptConcurrency: Math.max(1, Math.floor(validatePositive(options.decryptConcurrency, DEFAULT_DECRYPT_CONCURRENCY, "decryptConcurrency"))),
        onStateChange: options.onStateChange,
        onProgress: options.onProgress,
        onMessage: options.onMessage,
        // config.fetch 保存的是页面 fetch 的原始引用，避免被字节 SDK 改写。
        fetch: fetcher
      };
      this.audio.addEventListener("seeking", this.onSeeking);
      this.audio.addEventListener("play", this.onPlay);
      this.audio.addEventListener("pause", this.onPause);
      this.audio.addEventListener("ended", this.onEnded);
    }
    get currentState() {
      return this.state;
    }
    get mediaInfo() {
      return this.info;
    }
    get element() {
      return this.audio;
    }
    /**
     * 设置播放倍速。
     *
     * 服务端只提供 1× 的 TTS 音频（playinfo 请求没有 speed 参数），
     * 所以倍速在客户端做：直接改 media element 的 playbackRate，
     * 并用 preservesPitch 保持音调，避免快放变声。
     * 预缓冲目标按倍速放大，见 waitForRoom。
     */
    setPlaybackRate(rate) {
      this.playbackRate = Math.min(4, Math.max(0.25, Number.isFinite(rate) ? rate : 1));
      this.applyPlaybackRate();
    }
    /**
     * 把当前倍速套到 media element 上。
     *
     * 必须同时写 defaultPlaybackRate：任何一次媒体加载（换章、停止后重开时
     * 播放器内部的 removeAttribute('src') + load()）都会把 playbackRate 重置成
     * defaultPlaybackRate，只设 playbackRate 的话倍速一重开就没了。
     * 另外 preservesPitch 也随之重设，快放不变声。
     */
    applyPlaybackRate() {
      const el = this.audio;
      el.defaultPlaybackRate = this.playbackRate;
      el.playbackRate = this.playbackRate;
      if ("preservesPitch" in el) el.preservesPitch = true;
      if ("webkitPreservesPitch" in el) el.webkitPreservesPitch = true;
    }
    /** 加载并开始后台缓冲；autoplay 只表示首次缓冲后尝试调用 audio.play。 */
    async load(source, autoplay = false) {
      this.ensureAlive();
      const session = this.beginSession();
      this.autoplay = autoplay;
      this.emitState("loading");
      let initialStream = null;
      try {
        const url = this.validateUrl(source.url);
        this.streamController = new AbortController();
        initialStream = this.createNetworkStream(url, 0, this.streamController.signal);
        let { head, meta } = await this.parseHeadFromStream(initialStream, session);
        this.assertSession(session);
        const key = await importCencKey(source.key);
        this.assertSession(session);
        let counterStart = 0;
        if (meta.codec === "opus") {
          const probeEnd = meta.mdatStart + meta.offsets[Math.min(6, meta.sampleCount)];
          if (head.length < probeEnd) {
            await initialStream.bufferAtLeast(probeEnd);
            head = initialStream.snapshot();
          }
          counterStart = await this.detectCounterStart(meta, head, key);
        }
        this.assertSession(session);
        const sampleEntry = meta.codec === "aac" ? extractSampleEntry(head, meta.mdatStart) : meta.codec === "flac" ? extractFlacEntry(head, meta.mdatStart) : void 0;
        const mime = codecMime(meta.codec);
        const ctor = this.mediaSourceConstructor();
        if (!ctor.isTypeSupported(mime)) throw new Error(`浏览器不支持 MSE 音频格式: ${mime}`);
        const mediaSource = new ctor();
        this.mediaSource = mediaSource;
        this.objectUrl = unsafeWindow.URL.createObjectURL(mediaSource);
        const opened = this.waitForSourceOpen(mediaSource, session);
        this.audio.src = this.objectUrl;
        this.applyPlaybackRate();
        await opened;
        this.assertSession(session);
        this.sourceBuffer = mediaSource.addSourceBuffer(mime);
        this.segmentSequence = 0;
        const init2 = initSegment(meta, sampleEntry);
        this.emitMessage(`追加 init 段 ${init2.byteLength} 字节 (${mime})`, "info");
        await this.enqueueSourceBuffer(session, (sourceBuffer) => {
          sourceBuffer.appendBuffer(this.toPageBuffer(init2));
        });
        this.assertSession(session);
        const ticks = new Float64Array(meta.sampleCount + 1);
        for (let i2 = 0; i2 < meta.sampleCount; i2++) {
          ticks[i2 + 1] = ticks[i2] + meta.durations[i2];
        }
        const durationSeconds = meta.totalTicks / meta.timescale;
        const samplesPerSecond = meta.sampleCount / durationSeconds;
        const segmentSeconds = meta.codec === "opus" ? Math.min(this.options.segmentSeconds, MAX_WEBM_SEGMENT_SECONDS) : this.options.segmentSeconds;
        this.context = {
          url,
          head,
          meta,
          key,
          counterStart,
          ticks,
          samplesPerSecond,
          samplesPerSegment: Math.max(1, Math.round(samplesPerSecond * segmentSeconds))
        };
        this.info = {
          codec: meta.codec,
          sampleCount: meta.sampleCount,
          durationSeconds,
          timescale: meta.timescale,
          channels: meta.channels,
          encryptedBytes: meta.offsets[meta.sampleCount]
        };
        await initialStream.skip(meta.mdatStart);
        this.assertSession(session);
        this.emitState("ready");
        this.startStream(0, initialStream);
        initialStream = null;
        return this.info;
      } catch (error) {
        void (initialStream == null ? void 0 : initialStream.cancel());
        if (this.isCurrent(session) && !isAbort(error)) {
          this.emitMessage(asError(error).message, "error");
          void this.reportAppendFailure();
          this.emitState("error");
        }
        throw error;
      }
    }
    /** load(..., true) 的便捷形式。 */
    start(source) {
      return this.load(source, true);
    }
    play() {
      this.ensureAlive();
      return this.audio.play().then(() => void 0);
    }
    pause() {
      this.audio.pause();
    }
    /** 停止当前流并释放 MSE URL，但保留播放器实例以便再次 load。 */
    stop() {
      if (this.state === "destroyed") return;
      this.beginSession();
      this.emitState("idle");
    }
    destroy() {
      if (this.state === "destroyed") return;
      this.beginSession();
      this.audio.removeEventListener("seeking", this.onSeeking);
      this.audio.removeEventListener("play", this.onPlay);
      this.audio.removeEventListener("pause", this.onPause);
      this.audio.removeEventListener("ended", this.onEnded);
      this.emitState("destroyed");
    }
    ensureAlive() {
      if (this.state === "destroyed") throw new Error("播放器已销毁");
    }
    beginSession() {
      var _a, _b;
      this.session++;
      this.streamToken++;
      this.seekToken++;
      (_a = this.sessionController) == null ? void 0 : _a.abort();
      (_b = this.streamController) == null ? void 0 : _b.abort();
      this.sessionController = new AbortController();
      this.streamController = null;
      this.context = null;
      this.info = null;
      this.autoplay = false;
      this.sourceBuffer = null;
      this.mediaSource = null;
      this.sourceBufferChain = Promise.resolve();
      this.audio.pause();
      if (this.audio.src) {
        this.audio.removeAttribute("src");
        this.audio.load();
      }
      if (this.objectUrl) {
        unsafeWindow.URL.revokeObjectURL(this.objectUrl);
        this.objectUrl = null;
      }
      return this.session;
    }
    validateUrl(raw) {
      const url = raw.trim();
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        throw new Error("音频 URL 必须是 HTTP(S) 地址");
      }
      return parsed.toString();
    }
    mediaSourceConstructor() {
      const win2 = unsafeWindow;
      const ctor = win2.MediaSource ?? globalThis.MediaSource;
      if (!ctor) throw new Error("当前浏览器没有 MediaSource 支持");
      return ctor;
    }
    /**
     * 把字节搬到页面 realm，再交给 appendBuffer。
     *
     * MediaSource 取自 unsafeWindow（页面 realm），而我们构造的 Uint8Array
     * 属于用户脚本沙箱 realm。跨 realm 的 ArrayBuffer 传进 appendBuffer 会被拒，
     * 表现是 SourceBuffer 立刻抛 error 事件、而 <audio>.error 仍是 null
     * —— 只看报错完全看不出是 realm 问题。
     *
     * 页面 realm 没暴露 Uint8Array 时（少见）就原样返回，交给浏览器自己判断。
     */
    toPageBuffer(bytes) {
      const win2 = unsafeWindow;
      const PageUint8Array = win2.Uint8Array;
      if (!PageUint8Array || PageUint8Array === Uint8Array) return bytes;
      const copy = new PageUint8Array(bytes.byteLength);
      copy.set(bytes);
      return copy;
    }
    async parseHeadFromStream(stream, session) {
      let size = Math.min(this.options.headBytes, this.options.maxHeadBytes);
      let lastError = null;
      while (size <= this.options.maxHeadBytes) {
        const complete = await stream.bufferAtLeast(size);
        this.assertSession(session);
        const head = stream.snapshot();
        try {
          return { head, meta: parseCencMetadata(head) };
        } catch (error) {
          lastError = error;
          const message = asError(error).message;
          const incomplete = /未找到|不完整|缺少/.test(message);
          if (!incomplete || !complete || size === this.options.maxHeadBytes) throw error;
          size = Math.min(this.options.maxHeadBytes, size * 2);
        }
      }
      throw lastError instanceof Error ? lastError : new Error("无法解析音频 MP4 头");
    }
    createNetworkStream(url, start, signal, initial = new Uint8Array()) {
      return new SequentialByteStream(
        initial,
        null,
        () => this.openAudioReader(url, start, signal)
      );
    }
    /**
     * 打开一条从指定字节一直到文件末尾的流。
     * 所有 CDN 请求都明确禁止 Referer、Cookie；顺序播放期间只会打开一次。
     */
    async openAudioReader(url, start, signal) {
      this.emitMessage(`打开音频流：bytes=${start}-`, "info");
      const response = await this.options.fetch(url, {
        method: "GET",
        headers: { Range: `bytes=${start}-` },
        credentials: "omit",
        // 两项都设：policy 禁止浏览器生成 Referer，空 referrer 防止调用方 Request 继承。
        referrer: "",
        referrerPolicy: "no-referrer",
        signal
      });
      if (!response.ok && response.status !== 206) {
        throw new Error(`音频 CDN 请求失败(HTTP ${response.status})`);
      }
      if (start > 0 && response.status !== 206) {
        throw new Error("音频 CDN 忽略了 Range，无法从拖动位置续流");
      }
      if (response.body) return response.body.getReader();
      const bytes = await response.arrayBuffer();
      const fallback = new Response(bytes).body;
      if (!fallback) throw new Error("浏览器不支持流式读取 Response");
      return fallback.getReader();
    }
    sessionSignal(session) {
      this.assertSession(session);
      return this.sessionController.signal;
    }
    assertSession(session) {
      if (!this.isCurrent(session)) throw abortError$1();
    }
    isCurrent(session) {
      var _a;
      return this.session === session && !((_a = this.sessionController) == null ? void 0 : _a.signal.aborted);
    }
    async waitForSourceOpen(mediaSource, session) {
      const signal = this.sessionSignal(session);
      await new Promise((resolve, reject) => {
        if (mediaSource.readyState === "open") {
          resolve();
          return;
        }
        const onOpen = () => {
          cleanup();
          resolve();
        };
        const onError = () => {
          cleanup();
          reject(new Error("MediaSource 打开失败"));
        };
        const onAbort = () => {
          cleanup();
          reject(abortError$1());
        };
        const cleanup = () => {
          mediaSource.removeEventListener("sourceopen", onOpen);
          mediaSource.removeEventListener("error", onError);
          signal.removeEventListener("abort", onAbort);
        };
        mediaSource.addEventListener("sourceopen", onOpen, { once: true });
        mediaSource.addEventListener("error", onError, { once: true });
        signal.addEventListener("abort", onAbort, { once: true });
      });
    }
    enqueueSourceBuffer(session, operation) {
      const sourceBuffer = this.sourceBuffer;
      if (!sourceBuffer) return Promise.reject(new Error("SourceBuffer 尚未创建"));
      const signal = this.sessionSignal(session);
      const run = async () => {
        if (signal.aborted) throw abortError$1();
        await waitForSourceBufferIdle(sourceBuffer, signal);
        if (signal.aborted) throw abortError$1();
        return new Promise((resolve, reject) => {
          let settled = false;
          const finish = (error) => {
            if (settled) return;
            settled = true;
            sourceBuffer.removeEventListener("updateend", onUpdateEnd);
            sourceBuffer.removeEventListener("error", onError);
            signal.removeEventListener("abort", onAbort);
            if (error) reject(error);
            else resolve();
          };
          const onUpdateEnd = () => finish();
          const onError = () => finish(new Error("SourceBuffer 更新失败"));
          const onAbort = () => finish(abortError$1());
          sourceBuffer.addEventListener("updateend", onUpdateEnd);
          sourceBuffer.addEventListener("error", onError);
          signal.addEventListener("abort", onAbort, { once: true });
          try {
            operation(sourceBuffer);
          } catch (error) {
            finish(asError(error));
          }
        });
      };
      const next = this.sourceBufferChain.catch(() => void 0).then(run);
      this.sourceBufferChain = next;
      return next;
    }
    startStream(startSample, existingStream) {
      var _a;
      const context = this.context;
      if (!context || this.state === "destroyed") return;
      if (!existingStream) {
        (_a = this.streamController) == null ? void 0 : _a.abort();
        this.streamController = new AbortController();
      }
      const controller = this.streamController;
      if (!controller) return;
      const token = ++this.streamToken;
      void this.runStream(
        context,
        this.session,
        token,
        startSample,
        controller.signal,
        existingStream
      );
    }
    async runStream(context, session, token, startSample, signal, existingStream) {
      var _a;
      let sample = startSample;
      let first = true;
      let stream = existingStream ?? null;
      try {
        stream ?? (stream = this.createSampleStream(context, startSample, signal));
        while (this.isStreamCurrent(session, token, signal) && sample < context.meta.sampleCount) {
          await this.waitForRoom(session, token, signal);
          if (!this.isStreamCurrent(session, token, signal)) return;
          const endSample = Math.min(context.meta.sampleCount, sample + context.samplesPerSegment);
          const byteLength = context.meta.offsets[endSample] - context.meta.offsets[sample];
          const encrypted = await stream.readExactly(byteLength);
          if (!this.isStreamCurrent(session, token, signal)) return;
          const plain = await this.decryptRange(context, encrypted, sample, endSample);
          if (!this.isStreamCurrent(session, token, signal)) return;
          const segment = context.meta.codec === "opus" ? buildWebmCluster(
            Math.round(context.ticks[sample] * 1e3 / context.meta.timescale),
            plain.map((_, index) => Math.round(
              context.ticks[sample + index] * 1e3 / context.meta.timescale
            ) - Math.round(context.ticks[sample] * 1e3 / context.meta.timescale)),
            plain
          ) : buildMp4Segment(
            context.ticks[sample],
            plain.map((data, index) => ({
              data,
              duration: context.meta.durations[sample + index]
            })),
            ++this.segmentSequence
          );
          await this.enqueueSourceBuffer(session, (sourceBuffer) => {
            sourceBuffer.appendBuffer(this.toPageBuffer(segment));
          });
          if (first) {
            const toc = (_a = plain[0]) == null ? void 0 : _a[0];
            this.emitMessage(
              `首段 samples=${sample}..${endSample} 密文${encrypted.byteLength}B 段长${segment.byteLength}B TOC=0x${(toc ?? 0).toString(16)}`,
              "info"
            );
          }
          if (!this.isStreamCurrent(session, token, signal)) return;
          await this.evictBehind(session);
          sample = endSample;
          this.emitProgress({
            processedSamples: sample,
            totalSamples: context.meta.sampleCount,
            percent: Math.round(sample / context.meta.sampleCount * 100),
            bufferedAhead: this.bufferedAhead(),
            durationSeconds: context.meta.totalTicks / context.meta.timescale
          });
          if (first && this.autoplay) {
            first = false;
            void this.audio.play().catch(() => {
              this.emitMessage("自动播放被浏览器拦截，请点击音频控件播放", "warn");
            });
          } else {
            first = false;
          }
        }
        if (this.isStreamCurrent(session, token, signal)) {
          await this.finishStream(session, sample);
          this.emitMessage("音频已缓冲到结尾", "info");
        }
      } catch (error) {
        if (this.isStreamCurrent(session, token, signal) && !isAbort(error)) {
          this.emitMessage(asError(error).message, "error");
          void this.reportAppendFailure();
          this.emitState("error");
        }
      } finally {
        void (stream == null ? void 0 : stream.cancel());
      }
    }
    /**
     * 补报媒体元素的错误码。
     *
     * SourceBuffer 的 error 事件先于媒体元素错误传播，同步读 audio.error
     * 大概率是 null。让出一轮事件循环再读，才能拿到真正的 MediaError。
     */
    async reportAppendFailure() {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const detail = describeMediaError(this.audio);
      if (detail) this.emitMessage(`媒体元素错误${detail}`, "error");
    }
    isStreamCurrent(session, token, signal) {
      return this.isCurrent(session) && this.streamToken === token && !signal.aborted;
    }
    /**
     * 全部样本都送进 SourceBuffer 后收口 MediaSource。
     *
     * 只有真的跑到最后一个样本才收口。seek 之后的流也会走到循环末尾，
     * 但那时前面还有没缓冲的区间，提前 endOfStream 会把 duration 定在错的位置。
     */
    async finishStream(session, lastSample) {
      const context = this.context;
      const mediaSource = this.mediaSource;
      if (!context || !mediaSource) return;
      if (lastSample < context.meta.sampleCount) return;
      if (mediaSource.readyState !== "open") return;
      await this.sourceBufferChain.catch(() => void 0);
      if (!this.isCurrent(session)) return;
      if (this.sourceBuffer) {
        await waitForSourceBufferIdle(this.sourceBuffer, this.sessionSignal(session));
      }
      if (!this.isCurrent(session) || mediaSource.readyState !== "open") return;
      try {
        mediaSource.endOfStream();
      } catch (error) {
        this.emitMessage(`标记音频结尾失败: ${asError(error).message}`, "warn");
      }
    }
    async waitForRoom(session, token, signal) {
      while (this.isStreamCurrent(session, token, signal) && this.bufferedAhead() >= this.options.maxBufferAheadSeconds * this.playbackRate) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      if (!this.isStreamCurrent(session, token, signal)) throw abortError$1();
    }
    /**
     * seek 后的新流。目标仍在已保存的 MP4 头内时先复用内存字节，读完再从
     * head.length 开一条网络流；否则直接从目标 sample 的绝对偏移续传。
     */
    createSampleStream(context, startSample, signal) {
      const start = context.meta.mdatStart + context.meta.offsets[startSample];
      if (start < context.head.length) {
        return this.createNetworkStream(
          context.url,
          context.head.length,
          signal,
          context.head.slice(start)
        );
      }
      return this.createNetworkStream(context.url, start, signal);
    }
    async decryptRange(context, encrypted, startSample, endSample) {
      const ivSize = cencIvSize(context.meta);
      const jobs = [];
      for (let i2 = startSample; i2 < endSample; i2++) {
        const relative = context.meta.offsets[i2] - context.meta.offsets[startSample];
        const size = context.meta.sizes[i2];
        jobs.push({
          iv: context.meta.ivs.slice(i2 * ivSize, (i2 + 1) * ivSize),
          ciphertext: encrypted.slice(relative, relative + size)
        });
      }
      return mapLimit(jobs, this.options.decryptConcurrency, (job) => decryptCencSample(
        context.key,
        job.iv,
        job.ciphertext,
        context.counterStart
      ));
    }
    async detectCounterStart(meta, head, key) {
      const count = Math.min(6, meta.sampleCount);
      if (count === 0) return 0;
      const start = meta.mdatStart + meta.offsets[0];
      const end = meta.mdatStart + meta.offsets[count] - 1;
      if (end >= head.length) throw new Error("Opus counter 探测数据不完整");
      const encrypted = head.slice(start, end + 1);
      const ivSize = cencIvSize(meta);
      for (const candidate of [0, 1]) {
        const firstBytes = /* @__PURE__ */ new Set();
        for (let i2 = 0; i2 < count; i2++) {
          const relative = meta.offsets[i2];
          const ciphertext = encrypted.slice(relative, relative + meta.sizes[i2]);
          const plain = await decryptCencSample(
            key,
            meta.ivs.slice(i2 * ivSize, (i2 + 1) * ivSize),
            ciphertext,
            candidate
          );
          if (plain.length > 0) firstBytes.add(plain[0]);
        }
        if (firstBytes.size === 1) {
          this.emitMessage(`CENC counter 低位起始=${candidate}`, "info");
          return candidate;
        }
      }
      this.emitMessage("CENC counter 未收敛，按 0 继续", "warn");
      return 0;
    }
    async evictBehind(session) {
      const sourceBuffer = this.sourceBuffer;
      if (!sourceBuffer || !sourceBuffer.buffered.length) return;
      const current = this.audio.currentTime;
      if (current <= this.options.keepBehindSeconds + 5) return;
      const start = sourceBuffer.buffered.start(0);
      const end = current - this.options.keepBehindSeconds;
      if (start < end) {
        try {
          await this.enqueueSourceBuffer(session, (buffer) => buffer.remove(start, end));
        } catch {
        }
      }
    }
    async restartAt(target, wasPlaying) {
      var _a, _b;
      const context = this.context;
      if (!context) return;
      if (this.audio.error) {
        this.emitMessage("播放元素已进入错误态，无法跳转，请重新开始听书", "warn");
        return;
      }
      const session = this.session;
      const seek = ++this.seekToken;
      this.streamToken++;
      (_a = this.streamController) == null ? void 0 : _a.abort();
      let low = 0;
      let high = context.meta.sampleCount - 1;
      let index = 0;
      const targetTicks = target * context.meta.timescale;
      while (low <= high) {
        const middle = low + high >> 1;
        if (context.ticks[middle] <= targetTicks) {
          index = middle;
          low = middle + 1;
        } else {
          high = middle - 1;
        }
      }
      const preSamples = Math.max(1, Math.round(context.samplesPerSecond * 2));
      const startSample = Math.max(0, index - preSamples);
      this.emitMessage(`跳转到 ${target.toFixed(1)} 秒`, "info");
      await this.sourceBufferChain.catch(() => void 0);
      if (seek !== this.seekToken || !this.isCurrent(session)) return;
      const bufferedEnd = ((_b = this.sourceBuffer) == null ? void 0 : _b.buffered.length) ? this.sourceBuffer.buffered.end(this.sourceBuffer.buffered.length - 1) : 0;
      if (bufferedEnd > 0) {
        try {
          await this.enqueueSourceBuffer(session, (sourceBuffer) => sourceBuffer.remove(0, bufferedEnd + 0.5));
        } catch {
        }
      }
      if (seek !== this.seekToken || !this.isCurrent(session)) return;
      if (this.mediaSource && this.mediaSource.readyState === "closed") {
        this.emitMessage("媒体源已关闭，无法跳转", "warn");
        return;
      }
      this.startStream(startSample);
      if (wasPlaying) void this.audio.play().catch(() => void 0);
    }
    isTimeBuffered(time) {
      var _a;
      const ranges = (_a = this.sourceBuffer) == null ? void 0 : _a.buffered;
      if (!ranges) return false;
      for (let i2 = 0; i2 < ranges.length; i2++) {
        if (time >= ranges.start(i2) - 0.05 && time <= ranges.end(i2) + 0.05) return true;
      }
      return false;
    }
    bufferedAhead() {
      var _a;
      const ranges = (_a = this.sourceBuffer) == null ? void 0 : _a.buffered;
      if (!ranges || !ranges.length) return 0;
      const current = this.audio.currentTime;
      for (let i2 = 0; i2 < ranges.length; i2++) {
        if (current >= ranges.start(i2) - 0.05 && current <= ranges.end(i2) + 0.05) {
          return Math.max(0, ranges.end(i2) - current);
        }
      }
      return Math.max(0, ranges.end(ranges.length - 1) - current);
    }
    emitState(state2) {
      var _a, _b;
      this.state = state2;
      (_b = (_a = this.options).onStateChange) == null ? void 0 : _b.call(_a, state2);
    }
    emitProgress(progress) {
      var _a, _b;
      (_b = (_a = this.options).onProgress) == null ? void 0 : _b.call(_a, progress);
    }
    emitMessage(message, level) {
      var _a, _b;
      (_b = (_a = this.options).onMessage) == null ? void 0 : _b.call(_a, message, level);
    }
  }
  function gmAudioFetch(input, init2 = {}) {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers = normalizeHeaders(init2.headers);
    const signal = init2.signal ?? null;
    return new Promise((resolve, reject) => {
      if (signal == null ? void 0 : signal.aborted) {
        reject(abortError());
        return;
      }
      let settled = false;
      let request;
      const onAbort = () => {
        try {
          request == null ? void 0 : request.abort();
        } catch {
        }
        if (settled) return;
        settled = true;
        reject(abortError());
      };
      signal == null ? void 0 : signal.addEventListener("abort", onAbort, { once: true });
      const cleanup = () => {
        signal == null ? void 0 : signal.removeEventListener("abort", onAbort);
      };
      const succeed = (res, body) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(makeResponse(res, body));
      };
      const fail = (error) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      };
      request = GM_xmlhttpRequest({
        method: "GET",
        url,
        headers,
        responseType: "stream",
        // GM 请求不带页面 Referer；anonymous 同时也不带 Cookie
        anonymous: true,
        onreadystatechange(res) {
          if (settled || res.readyState < 3) return;
          const stream = res.response;
          if (stream instanceof ReadableStream) succeed(res, stream);
        },
        onload(res) {
          if (settled) return;
          const stream = res.response;
          if (stream instanceof ReadableStream) {
            succeed(res, stream);
            return;
          }
          const bytes = toBytes(res);
          if (!bytes) {
            fail(new Error(
              "GM_xmlhttpRequest 未返回二进制音频数据（请确认 Tampermonkey 版本支持 responseType）"
            ));
            return;
          }
          if (bytes.byteLength === 0 && res.status !== 204 && res.status !== 304) {
            fail(new Error("音频响应为空"));
            return;
          }
          succeed(res, bytes);
        },
        onerror(res) {
          fail(new Error(`音频 CDN 请求失败：${describe(res)}`));
        },
        ontimeout() {
          fail(new Error("音频 CDN 请求超时"));
        }
      });
    });
  }
  function abortError() {
    return new DOMException("音频请求已取消", "AbortError");
  }
  function parseHeaders(raw) {
    const headers = new Headers();
    if (!raw) return headers;
    for (const line of raw.split(/\r?\n/)) {
      const colon = line.indexOf(":");
      if (colon <= 0) continue;
      const name2 = line.slice(0, colon).trim();
      const value = line.slice(colon + 1).trim();
      if (!name2) continue;
      try {
        headers.append(name2, value);
      } catch {
      }
    }
    return headers;
  }
  function makeResponse(res, body) {
    return new Response(body ?? new Uint8Array(), {
      status: res.status || 200,
      statusText: res.statusText || "",
      headers: parseHeaders(res.responseHeaders)
    });
  }
  function toBytes(res) {
    const raw = res.response;
    if (raw instanceof ArrayBuffer) return new Uint8Array(raw);
    if (raw instanceof Uint8Array) return raw;
    return null;
  }
  function normalizeHeaders(init2) {
    const out = {};
    if (!init2) return out;
    if (init2 instanceof Headers) {
      init2.forEach((value, key) => {
        out[key] = value;
      });
      return out;
    }
    if (Array.isArray(init2)) {
      for (const [key, value] of init2) {
        if (key !== void 0 && value !== void 0) out[key] = value;
      }
      return out;
    }
    return { ...init2 };
  }
  function describe(res) {
    if ("error" in res && res.error) return String(res.error);
    const status = res.status;
    return status ? `HTTP ${status}` : "网络错误";
  }
  const CONTENT_SELECTOR = "#fqa-reader-content";
  const TITLE_SELECTOR = "h1.muye-reader-title";
  const ACTIVE_CLASS = "fqa-audio-active";
  function collectParagraphs() {
    const map = /* @__PURE__ */ new Map();
    const container2 = document.querySelector(CONTENT_SELECTOR);
    if (!container2) return map;
    for (const node of container2.querySelectorAll("p[idx]")) {
      const idx = Number(node.getAttribute("idx"));
      if (!Number.isFinite(idx)) continue;
      const list = map.get(idx);
      if (list) list.push(node);
      else map.set(idx, [node]);
    }
    return map;
  }
  function titleTarget(tags) {
    const titles = tags.filter((t) => t.is_title);
    if (titles.length !== 1) return null;
    return document.querySelector(TITLE_SELECTOR);
  }
  function tagIndexAt(tags, timeMs) {
    let low = 0;
    let high = tags.length - 1;
    let found = -1;
    while (low <= high) {
      const middle = low + high >> 1;
      if (tags[middle].startms <= timeMs) {
        found = middle;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }
    if (found < 0) return -1;
    return found;
  }
  class ParagraphHighlighter {
    constructor() {
      __publicField(this, "paragraphs", /* @__PURE__ */ new Map());
      __publicField(this, "tags", []);
      __publicField(this, "active", []);
      __publicField(this, "activeTagIndex", -1);
    }
    /** 换章或正文重新插入后调用，重建索引 */
    reset(tags) {
      this.clear();
      this.tags = tags;
      this.paragraphs = collectParagraphs();
      this.activeTagIndex = -1;
    }
    /** 正文 DOM 被替换过（切音色不会换 DOM，但切章会），重新抓一遍段落 */
    refresh() {
      this.paragraphs = collectParagraphs();
      this.activeTagIndex = -1;
    }
    get timeTags() {
      return this.tags;
    }
    /** 当前高亮对应的时间点下标，用于切音色时保持段落 */
    get currentTagIndex() {
      return this.activeTagIndex;
    }
    clear() {
      for (const node of this.active) node.classList.remove(ACTIVE_CLASS);
      this.active = [];
    }
    /**
     * 按播放时间更新高亮。
     *
     * @param scroll 是否把高亮段落滚进视口
     * @returns 当前时间点下标，没有变化时返回原值
     */
    update(timeMs, scroll) {
      if (this.tags.length === 0) return -1;
      const index = tagIndexAt(this.tags, timeMs);
      if (index < 0 || index === this.activeTagIndex) return this.activeTagIndex;
      this.activeTagIndex = index;
      this.applyTag(index, scroll);
      return index;
    }
    /** 直接高亮第 index 个时间点，供切音色后恢复位置用 */
    applyTag(index, scroll) {
      const tag = this.tags[index];
      if (!tag) return;
      this.clear();
      const targets = tag.is_title ? [titleTarget(this.tags)].filter((n) => n !== null) : this.rangeTargets(tag.startidx, tag.endidx);
      for (const node of targets) node.classList.add(ACTIVE_CLASS);
      this.active = targets;
      if (scroll && targets[0]) {
        targets[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    rangeTargets(startidx, endidx) {
      const targets = [];
      for (let idx = startidx; idx <= endidx; idx++) {
        const nodes = this.paragraphs.get(idx);
        if (nodes) targets.push(...nodes);
      }
      return targets;
    }
    /**
     * 点段落跳转用：找出这个节点属于哪个时间点。
     *
     * 从点击目标往上找最近的 <p[idx]>（点到 blk 或行内标签上也能命中），
     * 再拿 idx 去时间点表里查覆盖它的那一段。
     */
    tagIndexOfNode(node) {
      var _a;
      const paragraph = nearestParagraph(node);
      if (paragraph) {
        const idx = Number(paragraph.getAttribute("idx"));
        if (Number.isFinite(idx)) return this.tagIndexOfIdx(idx);
      }
      if (node instanceof Node && ((_a = titleTarget(this.tags)) == null ? void 0 : _a.contains(node))) {
        return this.tags.findIndex((t) => t.is_title);
      }
      return -1;
    }
    /** idx 落在哪个时间点区间。时间点可能跨多段，所以按区间判断 */
    tagIndexOfIdx(idx) {
      return this.tags.findIndex((t) => !t.is_title && idx >= t.startidx && idx <= t.endidx);
    }
    /** 第 index 个时间点的起始秒数，供 seek 用 */
    startSecondsOf(index) {
      const tag = this.tags[index];
      return tag ? tag.startms / 1e3 : null;
    }
  }
  function nearestParagraph(node) {
    let current = node;
    while (current) {
      if (current instanceof HTMLElement && current.matches("p[idx]")) return current;
      if (current instanceof HTMLElement && current.id === "fqa-reader-content") return null;
      current = current.parentNode;
    }
    return null;
  }
  const TONE_STORE_KEY = "audiobook_tone";
  const AUDIO_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const SPEED_STORE_KEY = "audiobook_speed";
  const state = vue.reactive({
    open: false,
    collapsed: false,
    tonePickerOpen: false,
    speedPickerOpen: false,
    loading: false,
    playing: false,
    spinning: false,
    tones: [],
    toneId: null,
    toneName: "",
    speed: storedSpeed(),
    cover: "",
    title: "",
    error: ""
  });
  const highlighter = new ParagraphHighlighter();
  let audio = null;
  let player = null;
  let itemId = "";
  let bookId = "";
  let trackTimer = null;
  let pendingTagIndex = -1;
  let playToken = 0;
  let paragraphClickBound = false;
  const onParagraphClick = (event) => {
    if (!state.open || state.toneId === null) return;
    const target = event.target;
    if (target instanceof HTMLElement && target.closest("a, button, sup")) return;
    const index = highlighter.tagIndexOfNode(target);
    if (index < 0) return;
    const seconds = highlighter.startSecondsOf(index);
    if (seconds === null || !audio) return;
    audio.currentTime = seconds;
    highlighter.applyTag(index, false);
    if (!state.playing) void togglePlay();
  };
  function bindParagraphClick() {
    if (paragraphClickBound) return;
    document.addEventListener("click", onParagraphClick);
    paragraphClickBound = true;
  }
  function unbindParagraphClick() {
    if (!paragraphClickBound) return;
    document.removeEventListener("click", onParagraphClick);
    paragraphClickBound = false;
  }
  function ensurePlayer() {
    if (player) return player;
    audio = document.createElement("audio");
    audio.preload = "none";
    audio.style.display = "none";
    document.body.appendChild(audio);
    player = new CencAudioPlayer(audio, {
      // 音频 CDN 不在页面 CSP 的 connect-src 里，页面 fetch 会被 report-only
      // 策略上报到 mon.zijieapi.com。走 GM 通道绕开上报，详见 gmFetch
      fetch: gmAudioFetch,
      onStateChange: onPlayerState,
      onMessage: (message, level) => {
        if (level === "error") {
          console.error("[fqa:audio]", message);
          state.error = message;
        } else {
          console.log("[fqa:audio]", message);
        }
      }
    });
    player.setPlaybackRate(state.speed);
    return player;
  }
  function onPlayerState(playerState) {
    state.playing = playerState === "playing";
    state.spinning = playerState === "playing" || playerState === "loading";
    if (playerState === "playing") state.error = "";
    if (playerState === "playing") startTracking();
    else stopTracking();
    if (playerState === "ended") {
      highlighter.clear();
      onChapterEnd();
    }
  }
  const NEXT_CHAPTER_SELECTOR = "div.chapter-btn.next";
  function onChapterEnd() {
    var _a;
    if (settings$1.audiobookChapterEnd !== "next") {
      state.spinning = false;
      return;
    }
    const next = (_a = document.querySelector(NEXT_CHAPTER_SELECTOR)) == null ? void 0 : _a.firstChild;
    if (typeof (next == null ? void 0 : next.click) !== "function") {
      state.spinning = false;
      state.error = "已经是最后一章";
      return;
    }
    state.spinning = true;
    const before = itemId;
    next.click();
    unsafeWindow.setTimeout(() => {
      var _a2;
      if (!state.open || itemId !== before) return;
      const current = ((_a2 = window.location.pathname.split("/").pop()) == null ? void 0 : _a2.substring(0, 19)) || "";
      if (current && current !== before) {
        void switchChapter(current, { cover: state.cover, title: state.title });
      } else {
        state.spinning = false;
        state.error = "自动切章失败";
      }
    }, 3e3);
  }
  function startTracking() {
    if (trackTimer !== null) return;
    trackTimer = unsafeWindow.setInterval(() => {
      if (!audio) return;
      highlighter.update(audio.currentTime * 1e3, settings$1.audiobookFollow);
    }, 120);
  }
  function stopTracking() {
    if (trackTimer === null) return;
    unsafeWindow.clearInterval(trackTimer);
    trackTimer = null;
  }
  function storedToneId() {
    const raw = read(TONE_STORE_KEY);
    return typeof raw === "number" ? raw : null;
  }
  function storedSpeed() {
    const raw = read(SPEED_STORE_KEY);
    return typeof raw === "number" && AUDIO_SPEEDS.includes(raw) ? raw : 1;
  }
  async function openAudiobook(chapter, book, meta) {
    itemId = chapter;
    bookId = book;
    state.cover = meta.cover;
    state.title = meta.title;
    state.error = "";
    state.open = true;
    state.collapsed = false;
    if (state.tones.length === 0) {
      try {
        state.tones = await getBookAvailableTones(bookId);
      } catch (e) {
        state.error = "取音色列表失败";
        console.error("[fqa:audio] 取音色列表失败:", e);
        return;
      }
    }
    if (state.tones.length === 0) {
      state.error = "这本书没有可用音色";
      return;
    }
    const remembered = storedToneId();
    if (remembered !== null && state.tones.some((t) => t.id === remembered)) {
      await selectTone(remembered);
      return;
    }
    state.tonePickerOpen = true;
  }
  async function selectTone(toneId) {
    state.tonePickerOpen = false;
    const tone = state.tones.find((t) => t.id === toneId);
    state.toneId = toneId;
    state.toneName = (tone == null ? void 0 : tone.name) ?? "";
    write(TONE_STORE_KEY, toneId);
    await playCurrent();
  }
  function openTonePicker() {
    state.speedPickerOpen = false;
    state.tonePickerOpen = true;
  }
  function closeTonePicker() {
    state.tonePickerOpen = false;
    if (state.toneId === null) closeAudiobook();
  }
  function openSpeedPicker() {
    state.tonePickerOpen = false;
    state.speedPickerOpen = true;
  }
  function closeSpeedPicker() {
    state.speedPickerOpen = false;
  }
  function setSpeed(speed) {
    if (!AUDIO_SPEEDS.includes(speed)) return;
    state.speed = speed;
    state.speedPickerOpen = false;
    write(SPEED_STORE_KEY, speed);
    player == null ? void 0 : player.setPlaybackRate(speed);
  }
  async function changeTone(toneId) {
    if (toneId === state.toneId) {
      state.tonePickerOpen = false;
      return;
    }
    pendingTagIndex = highlighter.currentTagIndex;
    await selectTone(toneId);
  }
  async function playCurrent() {
    const toneId = state.toneId;
    if (toneId === null || !itemId) return;
    const token = ++playToken;
    const chapter = itemId;
    state.loading = true;
    state.spinning = true;
    state.error = "";
    try {
      const [contexts, tags] = await Promise.all([
        getPlayInfo(chapter, toneId),
        getChapterParagraphTimeTag(chapter, toneId)
      ]);
      if (token !== playToken) return;
      const context = contexts.find((c) => c.item_id === chapter) ?? contexts[0];
      const url = context == null ? void 0 : context.urls[0];
      if (!context || !url) {
        state.error = "这一章没有音频";
        return;
      }
      highlighter.reset(tags);
      bindParagraphClick();
      const instance = ensurePlayer();
      await instance.start({ url, key: context.key });
      if (token !== playToken) return;
      if (pendingTagIndex >= 0) {
        const tag = tags[pendingTagIndex];
        if (tag && audio) {
          audio.currentTime = tag.startms / 1e3;
          highlighter.applyTag(pendingTagIndex, true);
        }
        pendingTagIndex = -1;
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      state.error = message;
      console.error("[fqa:audio] 播放失败:", e);
    } finally {
      state.loading = false;
      if (!state.playing) state.spinning = false;
    }
  }
  async function togglePlay() {
    if (!player) return;
    if (state.playing) {
      player.pause();
      return;
    }
    if (player.currentState === "ended" && audio) audio.currentTime = 0;
    try {
      await player.play();
    } catch (e) {
      console.warn("[fqa:audio] play() 被拒:", e);
    }
  }
  function toggleCollapsed() {
    state.collapsed = !state.collapsed;
  }
  async function switchChapter(chapter, meta) {
    if (!state.open || state.toneId === null) return;
    itemId = chapter;
    state.cover = meta.cover;
    state.title = meta.title;
    pendingTagIndex = -1;
    await playCurrent();
  }
  function refreshParagraphs() {
    if (state.open) highlighter.refresh();
  }
  function closeAudiobook() {
    stopTracking();
    unbindParagraphClick();
    playToken++;
    highlighter.clear();
    player == null ? void 0 : player.stop();
    state.open = false;
    state.collapsed = false;
    state.tonePickerOpen = false;
    state.speedPickerOpen = false;
    state.playing = false;
    state.spinning = false;
    state.loading = false;
    state.error = "";
  }
  const _hoisted_1$b = {
    class: "fqa-tone-box",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "选择音色"
  };
  const _hoisted_2$b = { class: "fqa-tone-title" };
  const _hoisted_3$b = { class: "fqa-tone-list" };
  const _hoisted_4$a = ["onClick"];
  const _hoisted_5$a = ["src", "alt"];
  const _hoisted_6$a = {
    key: 1,
    class: "fqa-tone-icon fqa-tone-icon-empty"
  };
  const _hoisted_7$8 = { class: "fqa-tone-text" };
  const _hoisted_8$8 = { class: "fqa-tone-name" };
  const _hoisted_9$8 = {
    key: 0,
    class: "fqa-tone-gender"
  };
  const _hoisted_10$8 = {
    key: 0,
    class: "fqa-tone-desc"
  };
  const _hoisted_11$7 = { class: "fqa-tone-actions" };
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "TonePicker",
    props: {
      tones: {},
      current: {}
    },
    emits: ["select", "close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      function genderLabel(gender) {
        if (gender === 1) return "男声";
        if (gender === 2) return "女声";
        return "";
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "fqa-tone-mask",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => emit("close"), ["self"]))
        }, [
          vue.createElementVNode("div", _hoisted_1$b, [
            vue.createElementVNode("h3", _hoisted_2$b, vue.toDisplayString(props.current === null ? "选择音色" : "切换音色"), 1),
            _cache[2] || (_cache[2] = vue.createElementVNode("p", { class: "fqa-tone-sub" }, "切换后会从当前段落开头继续", -1)),
            vue.createElementVNode("div", _hoisted_3$b, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.tones, (tone) => {
                return vue.openBlock(), vue.createElementBlock("button", {
                  key: tone.id,
                  type: "button",
                  class: vue.normalizeClass(["fqa-tone-item", { "fqa-tone-item-active": tone.id === props.current }]),
                  onClick: ($event) => emit("select", tone.id)
                }, [
                  tone.icon ? (vue.openBlock(), vue.createElementBlock("img", {
                    key: 0,
                    class: "fqa-tone-icon",
                    src: tone.icon,
                    alt: tone.name
                  }, null, 8, _hoisted_5$a)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$a, vue.toDisplayString(tone.name.slice(0, 1)), 1)),
                  vue.createElementVNode("span", _hoisted_7$8, [
                    vue.createElementVNode("span", _hoisted_8$8, [
                      vue.createTextVNode(vue.toDisplayString(tone.name) + " ", 1),
                      genderLabel(tone.gender) ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$8, vue.toDisplayString(genderLabel(tone.gender)), 1)) : vue.createCommentVNode("", true)
                    ]),
                    tone.description ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10$8, vue.toDisplayString(tone.description), 1)) : vue.createCommentVNode("", true)
                  ])
                ], 10, _hoisted_4$a);
              }), 128))
            ]),
            vue.createElementVNode("div", _hoisted_11$7, [
              vue.createElementVNode("button", {
                type: "button",
                class: "fqa-tone-btn",
                onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
              }, "取消")
            ])
          ])
        ]);
      };
    }
  });
  const _hoisted_1$a = ["innerHTML"];
  const _hoisted_2$a = {
    key: 1,
    class: "fqa-audio-bar"
  };
  const _hoisted_3$a = ["title", "aria-label"];
  const _hoisted_4$9 = ["src"];
  const _hoisted_5$9 = {
    key: 1,
    class: "fqa-audio-cover-empty"
  };
  const _hoisted_6$9 = ["innerHTML"];
  const _hoisted_7$7 = { class: "fqa-audio-meta" };
  const _hoisted_8$7 = { class: "fqa-audio-title" };
  const _hoisted_9$7 = { class: "fqa-audio-sub" };
  const _hoisted_10$7 = ["title"];
  const _hoisted_11$6 = ["innerHTML"];
  const _hoisted_12$6 = {
    key: 2,
    class: "fqa-audio-speeds",
    role: "menu",
    "aria-label": "播放倍速"
  };
  const _hoisted_13$5 = ["onClick"];
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "AudioBar",
    setup(__props) {
      function onSelect(id) {
        if (state.toneId === null) void selectTone(id);
        else void changeTone(id);
      }
      function speedLabel(v) {
        return `${v}×`;
      }
      function toggleSpeedPicker() {
        if (state.speedPickerOpen) closeSpeedPicker();
        else openSpeedPicker();
      }
      return (_ctx, _cache) => {
        return vue.unref(state).open ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(["fqa-audio-root", { "fqa-audio-collapsed": vue.unref(state).collapsed }])
        }, [
          vue.unref(state).collapsed ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            type: "button",
            class: "fqa-audio-expand",
            title: "展开听书栏",
            "aria-label": "展开听书栏",
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => vue.unref(toggleCollapsed) && vue.unref(toggleCollapsed)(...args))
          }, [
            vue.createElementVNode("span", {
              class: "fqa-audio-icon fqa-audio-icon-flip",
              innerHTML: vue.unref(leftIcon)
            }, null, 8, _hoisted_1$a)
          ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$a, [
            vue.createElementVNode("button", {
              type: "button",
              class: "fqa-audio-cover",
              title: vue.unref(state).playing ? "暂停" : "播放",
              "aria-label": vue.unref(state).playing ? "暂停" : "播放",
              onClick: _cache[1] || (_cache[1] = //@ts-ignore
              (...args) => vue.unref(togglePlay) && vue.unref(togglePlay)(...args))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(["fqa-audio-disc", { "fqa-audio-spin": vue.unref(state).spinning }])
              }, [
                vue.unref(state).cover ? (vue.openBlock(), vue.createElementBlock("img", {
                  key: 0,
                  src: vue.unref(state).cover,
                  alt: ""
                }, null, 8, _hoisted_4$9)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$9, "听"))
              ], 2),
              vue.createElementVNode("span", {
                class: "fqa-audio-state",
                innerHTML: vue.unref(state).playing ? vue.unref(playingIcon) : vue.unref(pausedIcon)
              }, null, 8, _hoisted_6$9)
            ], 8, _hoisted_3$a),
            vue.createElementVNode("div", _hoisted_7$7, [
              vue.createElementVNode("span", _hoisted_8$7, vue.toDisplayString(vue.unref(state).title), 1),
              vue.createElementVNode("span", _hoisted_9$7, vue.toDisplayString(vue.unref(state).error || (vue.unref(state).loading ? "缓冲中…" : vue.unref(state).toneName)), 1)
            ]),
            vue.createElementVNode("button", {
              type: "button",
              class: "fqa-audio-btn fqa-audio-speed",
              title: `播放倍速：${speedLabel(vue.unref(state).speed)}`,
              "aria-label": "播放倍速",
              onClick: toggleSpeedPicker
            }, vue.toDisplayString(speedLabel(vue.unref(state).speed)), 9, _hoisted_10$7),
            vue.createElementVNode("button", {
              type: "button",
              class: "fqa-audio-btn",
              title: "切换音色",
              "aria-label": "切换音色",
              onClick: _cache[2] || (_cache[2] = //@ts-ignore
              (...args) => vue.unref(openTonePicker) && vue.unref(openTonePicker)(...args))
            }, [..._cache[5] || (_cache[5] = [
              vue.createElementVNode("span", { class: "fqa-audio-dots" }, null, -1)
            ])]),
            vue.createElementVNode("button", {
              type: "button",
              class: "fqa-audio-btn",
              title: "收起",
              "aria-label": "收起听书栏",
              onClick: _cache[3] || (_cache[3] = //@ts-ignore
              (...args) => vue.unref(toggleCollapsed) && vue.unref(toggleCollapsed)(...args))
            }, [
              vue.createElementVNode("span", {
                class: "fqa-audio-icon",
                innerHTML: vue.unref(leftIcon)
              }, null, 8, _hoisted_11$6)
            ]),
            vue.createElementVNode("button", {
              type: "button",
              class: "fqa-audio-btn fqa-audio-close",
              title: "关闭听书",
              "aria-label": "关闭听书",
              onClick: _cache[4] || (_cache[4] = //@ts-ignore
              (...args) => vue.unref(closeAudiobook) && vue.unref(closeAudiobook)(...args))
            }, " × ")
          ])),
          vue.unref(state).speedPickerOpen ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$6, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(AUDIO_SPEEDS), (v) => {
              return vue.openBlock(), vue.createElementBlock("button", {
                key: v,
                type: "button",
                class: vue.normalizeClass(["fqa-audio-speed-item", { "fqa-audio-speed-active": vue.unref(state).speed === v }]),
                onClick: ($event) => vue.unref(setSpeed)(v)
              }, vue.toDisplayString(speedLabel(v)), 11, _hoisted_13$5);
            }), 128))
          ])) : vue.createCommentVNode("", true),
          vue.unref(state).tonePickerOpen ? (vue.openBlock(), vue.createBlock(_sfc_main$b, {
            key: 3,
            tones: vue.unref(state).tones,
            current: vue.unref(state).toneId,
            onSelect,
            onClose: vue.unref(closeTonePicker)
          }, null, 8, ["tones", "current", "onClose"])) : vue.createCommentVNode("", true)
        ], 2)) : vue.createCommentVNode("", true);
      };
    }
  });
  const audiobookcss = `/* 听书悬浮栏与音色弹窗。\r
 * 暗色跟随页面的 div.muye-reader-dark（与 userHook 的判定一致）。 */\r
\r
.fqa-audio-root {\r
	--fqa-audio-bg: #fff;\r
	--fqa-audio-text: #1f2329;\r
	--fqa-audio-sub: #8f959e;\r
	--fqa-audio-hover: rgba(31, 35, 41, 0.06);\r
	--fqa-audio-border: rgba(31, 35, 41, 0.1);\r
	--fqa-audio-shadow: 0 6px 24px rgba(0, 0, 0, 0.16);\r
\r
	position: fixed;\r
	left: 20px;\r
	bottom: 20px;\r
	z-index: 2147483000;\r
	font-size: 14px;\r
	color: var(--fqa-audio-text);\r
}\r
\r
/*\r
 * 暗色反色。悬浮栏挂在 body 下，够不到 .muye-reader-dark 的后代选择器，\r
 * 所以 audioPanel 在 #fqa-audio-root 容器上打 .fqa-audio-dark 类；\r
 * 真正的 .fqa-audio-root（Vue 根）是容器的子节点，用后代选择器作用到它。\r
 */\r
.fqa-audio-dark .fqa-audio-root {\r
	--fqa-audio-bg: #2b2b2b;\r
	--fqa-audio-text: #b3b3b3;\r
	--fqa-audio-sub: #7a7a7a;\r
	--fqa-audio-hover: rgba(255, 255, 255, 0.08);\r
	--fqa-audio-border: rgba(255, 255, 255, 0.12);\r
	--fqa-audio-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);\r
}\r
\r
.fqa-audio-bar {\r
	display: flex;\r
	align-items: center;\r
	gap: 10px;\r
	padding: 8px 10px 8px 8px;\r
	border-radius: 999px;\r
	background: var(--fqa-audio-bg);\r
	box-shadow: var(--fqa-audio-shadow);\r
}\r
\r
/* ------------------------------- 旋转封面 ------------------------------- */\r
\r
.fqa-audio-cover {\r
	position: relative;\r
	flex: 0 0 auto;\r
	width: 44px;\r
	height: 44px;\r
	padding: 0;\r
	border: none;\r
	border-radius: 50%;\r
	background: var(--fqa-audio-hover);\r
	cursor: pointer;\r
}\r
\r
/*\r
 * 只有这一层转。状态图标是 .fqa-audio-state，放在旋转层外面，\r
 * 否则会跟着封面一起转，反而更看不清。\r
 * 播放/缓冲时转，暂停时停在当前角度（animation-play-state 比移除动画更平滑）\r
 */\r
.fqa-audio-disc {\r
	position: absolute;\r
	inset: 0;\r
	border-radius: 50%;\r
	overflow: hidden;\r
	animation: fqa-audio-rotate 8s linear infinite;\r
	animation-play-state: paused;\r
}\r
\r
.fqa-audio-disc.fqa-audio-spin {\r
	animation-play-state: running;\r
}\r
\r
.fqa-audio-disc img {\r
	display: block;\r
	width: 100%;\r
	height: 100%;\r
	object-fit: cover;\r
}\r
\r
.fqa-audio-cover-empty {\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	width: 100%;\r
	height: 100%;\r
	color: var(--fqa-audio-sub);\r
	font-size: 18px;\r
}\r
\r
/* 播放/暂停状态。压一层遮罩，浅色封面上也看得清 */\r
.fqa-audio-state {\r
	position: absolute;\r
	inset: 0;\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	border-radius: 50%;\r
	background: rgba(0, 0, 0, 0.38);\r
	color: #fff;\r
	transition: background 0.2s ease;\r
}\r
\r
.fqa-audio-cover:hover .fqa-audio-state {\r
	background: rgba(0, 0, 0, 0.55);\r
}\r
\r
/*\r
 * 只给尺寸，不写 fill：paused.svg 里那块透明点击区是 fill="none"，\r
 * CSS 的 fill 优先级高于表现属性，会把它填成一个白方块盖住图标。\r
 * 两个 svg 自身已经用 currentColor，跟着上面的 color 走。\r
 */\r
.fqa-audio-state svg {\r
	width: 18px;\r
	height: 18px;\r
}\r
\r
@keyframes fqa-audio-rotate {\r
	from { transform: rotate(0deg); }\r
	to { transform: rotate(360deg); }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
	.fqa-audio-disc { animation: none; }\r
}\r
\r
/* -------------------------------- 文字区 -------------------------------- */\r
\r
.fqa-audio-meta {\r
	display: flex;\r
	flex-direction: column;\r
	justify-content: center;\r
	min-width: 0;\r
	max-width: 180px;\r
	line-height: 1.35;\r
}\r
\r
.fqa-audio-title,\r
.fqa-audio-sub {\r
	overflow: hidden;\r
	white-space: nowrap;\r
	text-overflow: ellipsis;\r
}\r
\r
.fqa-audio-sub {\r
	color: var(--fqa-audio-sub);\r
	font-size: 12px;\r
}\r
\r
/* -------------------------------- 按钮 -------------------------------- */\r
\r
.fqa-audio-btn,\r
.fqa-audio-expand {\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	flex: 0 0 auto;\r
	width: 32px;\r
	height: 32px;\r
	padding: 0;\r
	border: none;\r
	border-radius: 50%;\r
	background: transparent;\r
	color: var(--fqa-audio-text);\r
	cursor: pointer;\r
}\r
\r
.fqa-audio-btn:hover,\r
.fqa-audio-expand:hover {\r
	background: var(--fqa-audio-hover);\r
}\r
\r
.fqa-audio-close {\r
	font-size: 20px;\r
	line-height: 1;\r
}\r
\r
/* svg 用 currentColor，跟着按钮的 color 走 */\r
.fqa-audio-icon {\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	width: 16px;\r
	height: 16px;\r
}\r
\r
.fqa-audio-icon svg {\r
	width: 100%;\r
	height: 100%;\r
	fill: currentColor;\r
}\r
\r
/* 收起后箭头水平翻转朝右 */\r
.fqa-audio-icon-flip {\r
	transform: scaleX(-1);\r
}\r
\r
.fqa-audio-expand {\r
	background: var(--fqa-audio-bg);\r
	box-shadow: var(--fqa-audio-shadow);\r
	width: 36px;\r
	height: 36px;\r
}\r
\r
/* 三个点 */\r
.fqa-audio-dots,\r
.fqa-audio-dots::before,\r
.fqa-audio-dots::after {\r
	width: 4px;\r
	height: 4px;\r
	border-radius: 50%;\r
	background: currentColor;\r
}\r
\r
.fqa-audio-dots {\r
	position: relative;\r
}\r
\r
.fqa-audio-dots::before,\r
.fqa-audio-dots::after {\r
	content: '';\r
	position: absolute;\r
	top: 0;\r
}\r
\r
.fqa-audio-dots::before { left: -7px; }\r
.fqa-audio-dots::after { left: 7px; }\r
\r
/* ----------------------------- 段落高亮 ----------------------------- */\r
\r
.fqa-audio-active {\r
	background: var(--web-brand_light, rgba(241, 70, 70, 0.12));\r
	border-radius: 4px;\r
	transition: background 0.2s ease;\r
}\r
\r
/* ----------------------------- 音色弹窗 ----------------------------- */\r
\r
.fqa-tone-mask {\r
	position: fixed;\r
	inset: 0;\r
	z-index: 2147483002;\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	background: rgba(0, 0, 0, 0.45);\r
}\r
\r
.fqa-tone-box {\r
	width: min(420px, calc(100vw - 32px));\r
	max-height: min(560px, calc(100vh - 64px));\r
	display: flex;\r
	flex-direction: column;\r
	padding: 20px;\r
	border-radius: 12px;\r
	background: var(--fqa-audio-bg, #fff);\r
	color: var(--fqa-audio-text, #1f2329);\r
	box-shadow: 0 12px 40px rgba(0, 0, 0, 0.24);\r
}\r
\r
.fqa-tone-title {\r
	margin: 0 0 4px;\r
	font-size: 17px;\r
	font-weight: 600;\r
}\r
\r
.fqa-tone-sub {\r
	margin: 0 0 14px;\r
	color: var(--fqa-audio-sub, #8f959e);\r
	font-size: 12px;\r
}\r
\r
.fqa-tone-list {\r
	flex: 1 1 auto;\r
	overflow-y: auto;\r
	display: flex;\r
	flex-direction: column;\r
	gap: 6px;\r
}\r
\r
.fqa-tone-item {\r
	display: flex;\r
	align-items: center;\r
	gap: 10px;\r
	padding: 8px 10px;\r
	border: 1px solid transparent;\r
	border-radius: 8px;\r
	background: transparent;\r
	color: inherit;\r
	text-align: left;\r
	cursor: pointer;\r
}\r
\r
.fqa-tone-item:hover {\r
	background: var(--fqa-audio-hover, rgba(31, 35, 41, 0.06));\r
}\r
\r
.fqa-tone-item-active {\r
	border-color: var(--web-brand, #f14646);\r
}\r
\r
.fqa-tone-icon {\r
	flex: 0 0 auto;\r
	width: 36px;\r
	height: 36px;\r
	border-radius: 50%;\r
	object-fit: cover;\r
}\r
\r
.fqa-tone-icon-empty {\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	background: var(--fqa-audio-hover, rgba(31, 35, 41, 0.06));\r
	color: var(--fqa-audio-sub, #8f959e);\r
}\r
\r
.fqa-tone-text {\r
	display: flex;\r
	flex-direction: column;\r
	min-width: 0;\r
}\r
\r
.fqa-tone-name {\r
	display: flex;\r
	align-items: center;\r
	gap: 6px;\r
	font-size: 14px;\r
}\r
\r
.fqa-tone-gender {\r
	color: var(--fqa-audio-sub, #8f959e);\r
	font-size: 11px;\r
}\r
\r
.fqa-tone-desc {\r
	overflow: hidden;\r
	color: var(--fqa-audio-sub, #8f959e);\r
	font-size: 12px;\r
	white-space: nowrap;\r
	text-overflow: ellipsis;\r
}\r
\r
.fqa-tone-actions {\r
	display: flex;\r
	justify-content: flex-end;\r
	margin-top: 14px;\r
}\r
\r
.fqa-tone-btn {\r
	padding: 6px 16px;\r
	border: 1px solid var(--fqa-audio-border, rgba(31, 35, 41, 0.1));\r
	border-radius: 6px;\r
	background: transparent;\r
	color: inherit;\r
	cursor: pointer;\r
}\r
\r
.fqa-tone-btn:hover {\r
	background: var(--fqa-audio-hover, rgba(31, 35, 41, 0.06));\r
}\r
\r
/* -------------------------------- 倍速 -------------------------------- */\r
\r
/* 悬浮栏上的倍速按钮：显示 1× 这类文案，比图标按钮宽一点 */\r
.fqa-audio-speed {\r
	width: auto;\r
	min-width: 44px;\r
	padding: 0 8px;\r
	border-radius: 14px;\r
	font-size: 12px;\r
	font-variant-numeric: tabular-nums;\r
}\r
\r
/* 倍速弹层：贴在悬浮栏左上方向上弹。父级 .fqa-audio-root 是 fixed，直接绝对定位 */\r
.fqa-audio-speeds {\r
	position: absolute;\r
	left: 0;\r
	bottom: calc(100% + 8px);\r
	display: flex;\r
	gap: 4px;\r
	padding: 6px;\r
	border: 1px solid var(--fqa-audio-border);\r
	border-radius: 10px;\r
	background: var(--fqa-audio-bg);\r
	box-shadow: var(--fqa-audio-shadow);\r
	white-space: nowrap;\r
}\r
\r
.fqa-audio-speed-item {\r
	min-width: 44px;\r
	padding: 5px 8px;\r
	border: 0;\r
	border-radius: 7px;\r
	background: transparent;\r
	color: var(--fqa-audio-text);\r
	font-size: 12px;\r
	font-family: inherit;\r
	font-variant-numeric: tabular-nums;\r
	cursor: pointer;\r
}\r
\r
.fqa-audio-speed-item:hover {\r
	background: var(--fqa-audio-hover);\r
}\r
\r
.fqa-audio-speed-active {\r
	background: var(--fqa-audio-hover);\r
	color: var(--web-brand, #f14646);\r
	font-weight: 600;\r
}\r
`;
  const CONTAINER_ID$4 = "fqa-audio-root";
  const STYLE_ID$6 = "fqa-audio-style";
  let app$4 = null;
  let container$4 = null;
  let themeObserver$1 = null;
  function injectStyle$5() {
    if (document.getElementById(STYLE_ID$6)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID$6;
    style.textContent = audiobookcss;
    document.head.appendChild(style);
  }
  function syncTheme() {
    if (!container$4) return;
    const dark = document.querySelector("div.muye-reader-dark") !== null;
    container$4.classList.toggle("fqa-audio-dark", dark);
  }
  function watchTheme() {
    if (themeObserver$1) return;
    themeObserver$1 = new MutationObserver(syncTheme);
    themeObserver$1.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
  }
  function initAudioPanel() {
    if (app$4) return;
    injectStyle$5();
    container$4 = document.createElement("div");
    container$4.id = CONTAINER_ID$4;
    document.body.appendChild(container$4);
    syncTheme();
    watchTheme();
    app$4 = vue.createApp({ render: () => vue.h(_sfc_main$a) });
    app$4.config.errorHandler = (err, _instance, info) => {
      console.error(`[fqa:audio] Vue error (${info}):`, err);
    };
    app$4.mount(container$4);
  }
  const SHELF_BASE = "https://fanqienovel.com/reading/bookapi/bookshelf";
  async function getBookshelf() {
    const responses = await Promise.all([
      fetch$1(SHELF_BASE + "/info/v:version/?aid=1967&iid=0&version_code=57700&update_version_code=57700"),
      fetch$1("https://fanqienovel.com/api/reader/book/progress")
    ]);
    const response = responses[0];
    const response2 = responses[1];
    const data = await response.json();
    const info = data.data.book_shelf_info;
    const data_ = await response2.json();
    const data2 = data_.data;
    const all_items = info.map((item) => item.book_id);
    const response3 = await fetch$1("https://fanqienovel.com/api/book/simple/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        book_ids: all_items
      })
    });
    const data__ = await response3.json();
    const data3 = data__.data.bookList;
    const results = [];
    for (let i2 of data.data.book_shelf_info) {
      const progress = data2.find((it) => it.book_id === i2.book_id);
      const simple = data3.find((it) => it.book_id === i2.book_id);
      const item = {
        book_id: i2.book_id,
        last_operate_time: progress ? progress.read_timestamp : i2.last_operate_time,
        add_shelf_time: i2.add_shelf_time,
        group_name: i2.group_name,
        last_read_timestamp: progress ? progress.read_timestamp : 0,
        last_read_chapter_id: progress ? progress.item_id : "0",
        is_publish: (simple == null ? void 0 : simple.genre) === "6"
      };
      results.push(item);
    }
    return results;
  }
  async function multidetail(books) {
    const response = await fetch$1("https://fanqienovel.com/api/bookshelf/multidetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        books: books.map((book) => {
          return {
            book_id: book.book_id,
            item_id: book.last_read_chapter_id
          };
        })
      })
    });
    const data = await response.json();
    const list = data.data.detail_list;
    const results = [];
    for (let i2 of list) {
      const item = {
        book_id: i2.book_id,
        summary: i2.abstract,
        title: i2.book_name,
        author: i2.author_name,
        cover_url: i2.thumb_url,
        current_chapter_title: i2.item_show_title,
        current_chapter_id: i2.item_id,
        current_chapter_order: i2.real_chapter_order,
        total_chapter_count: i2.serial_count,
        last_chapter_update_time: i2.last_chapter_update_time * 1e3,
        last_chapter_id: i2.last_chapter_item_id,
        current_chapter_summary: i2.item_abstract,
        // last_chapter_title: i.last_chapter_show_title,
        status: i2.update_stop === "1" ? 4 : i2.creation_status,
        update_status: i2.update_status
      };
      results.push(item);
    }
    return results;
  }
  function identify(bookId2, modifyTime = 0) {
    return {
      asterisked: false,
      book_id: bookId2,
      book_type: 0,
      modify_time: modifyTime
    };
  }
  async function shelfPost(path, body) {
    const res = await fetch$1(`${SHELF_BASE}${path}/v?aid=1967`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || json && json.code !== 0 && json.code !== void 0) {
      throw new Error(`书架操作失败(${path}): ${(json == null ? void 0 : json.message) ?? res.status}`);
    }
    return json;
  }
  async function addToBookshelf(bookId2) {
    await shelfPost("/add", {
      add_book_source: 0,
      identify_data: [identify(bookId2)]
    });
  }
  async function removeFromBookshelf(bookId2) {
    await shelfPost("/delete", {
      identify_data: [identify(bookId2, Date.now())]
    });
  }
  async function moveToGroup(bookId2, groupName) {
    await shelfPost("/update", {
      book_data: [
        {
          asterisked: false,
          book_id: bookId2,
          book_type: 0,
          group_name: groupName,
          has_shown: false,
          is_pin: false,
          modify_time: Date.now()
        }
      ]
    });
  }
  async function isInBookshelf(book_id) {
    const response = await fetch$1(`https://fanqienovel.com/reading/bookapi/bookshelf/check/v:version/?aid=1967&iid=0&version_code=57700&update_version_code=57700&book_id=${book_id}`);
    const data = await response.json();
    return Boolean(data.data);
  }
  function addResponseModifier(modifier) {
    modifiers.push(modifier);
    return () => {
      const i2 = modifiers.indexOf(modifier);
      if (i2 >= 0) modifiers.splice(i2, 1);
    };
  }
  const modifiers = [];
  const blackList = [
    "mcs.zijieapi.com",
    "vcs.zijieapi.com/vc/setting",
    "mon.zijieapi.com",
    "mssdk.bytedance.com/web/common",
    "hm.baidu.com"
  ];
  const BLOCKED_BODY = JSON.stringify({
    e: 0,
    sc: 10,
    tc: 10
  });
  function checkBlack(url) {
    if (!settings$1.blockReport) return false;
    return blackList.some((black) => url.includes(black));
  }
  function toLocalArrayBuffer(buf) {
    const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    const out = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(out).set(bytes);
    return out;
  }
  function textToBody(text) {
    return toLocalArrayBuffer(new TextEncoder().encode(text));
  }
  function bodyToText(body) {
    if (typeof body === "string") return body;
    return new TextDecoder().decode(body);
  }
  function bodyToBuffer(body) {
    if (typeof body === "string") return textToBody(body);
    return body;
  }
  function resolveSimple(simple) {
    return { ...simple, responseBody: bodyToBuffer(simple.responseBody) };
  }
  function matchingModifiers(url) {
    return modifiers.filter((m) => m.matcher(url));
  }
  function applyModifiers(url, matched, simple) {
    let current = simple;
    for (const m of matched) {
      if (m.modify_response) current = m.modify_response(url, current);
    }
    return current;
  }
  function responseAllowsBody(status) {
    return status !== 204 && status !== 205 && status !== 304;
  }
  function simpleToResponse(simple) {
    return new Response(responseAllowsBody(simple.statusCode) ? simple.responseBody : null, {
      status: simple.statusCode,
      headers: simple.responseHeaders
    });
  }
  async function responseToSimple(res) {
    const body = toLocalArrayBuffer(await res.arrayBuffer());
    const headers = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return { responseBody: body, statusCode: res.status, responseHeaders: headers };
  }
  const originalFetch = unsafeWindow.fetch.bind(unsafeWindow);
  unsafeWindow.fetch = async function fetch2(input, init2) {
    let url;
    if (input instanceof Request) {
      url = input.url;
    } else if (input instanceof URL) {
      url = input.href;
    } else {
      url = input;
    }
    if (checkBlack(url)) {
      console.log("blocked request: " + url);
      return new Response(BLOCKED_BODY, {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const matched = matchingModifiers(url);
    if (matched.length === 0) return originalFetch(input, init2);
    const breaker = matched.find((m) => m.should_break(url));
    if (breaker == null ? void 0 : breaker.make_response) {
      return simpleToResponse(breaker.make_response(url));
    }
    if (!matched.some((m) => m.modify_response)) return originalFetch(input, init2);
    const res = await originalFetch(input, init2);
    try {
      const simple = await responseToSimple(res.clone());
      return simpleToResponse(applyModifiers(url, matched, simple));
    } catch (error) {
      console.error("[fqa:fetch] 修改响应失败，回退原始响应:", error);
      return res;
    }
  };
  const originalXMLHttpRequest = unsafeWindow.XMLHttpRequest;
  const XHR_PROTO = originalXMLHttpRequest.prototype;
  const XHR_DESC = {
    status: Object.getOwnPropertyDescriptor(XHR_PROTO, "status"),
    responseText: Object.getOwnPropertyDescriptor(XHR_PROTO, "responseText"),
    response: Object.getOwnPropertyDescriptor(XHR_PROTO, "response")
  };
  const XHR_GETALL = XHR_PROTO.getAllResponseHeaders;
  const XHR_GETONE = XHR_PROTO.getResponseHeader;
  function readXhrHeaders(self) {
    const headers = {};
    const all = XHR_GETALL.call(self);
    if (!all) return headers;
    for (const line of all.trim().split(/[\r\n]+/)) {
      const idx = line.indexOf(":");
      if (idx > 0) {
        headers[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
      }
    }
    return headers;
  }
  function readXhrBody(self) {
    const type = self.responseType;
    if (type === "arraybuffer") {
      return toLocalArrayBuffer(XHR_DESC.response.get.call(self));
    }
    if (type === "json") {
      const parsed = XHR_DESC.response.get.call(self);
      return textToBody(JSON.stringify(parsed));
    }
    return textToBody(XHR_DESC.responseText.get.call(self));
  }
  unsafeWindow.XMLHttpRequest = class XMLHttpRequest extends originalXMLHttpRequest {
    constructor() {
      super(...arguments);
      __publicField(this, "_blockedUrl");
      __publicField(this, "_fxaUrl", "");
      __publicField(this, "_fxaMatched", null);
      __publicField(this, "_fxaBreaker", null);
      __publicField(this, "_fxaApplied", false);
      __publicField(this, "_fxaSimple", null);
    }
    open(method, url, async = true, user, password) {
      this._fxaUrl = url;
      this._fxaMatched = null;
      this._fxaBreaker = null;
      this._fxaApplied = false;
      this._fxaSimple = null;
      if (checkBlack(url)) {
        console.log("blocked request: " + url);
        this._blockedUrl = url;
        return;
      }
      this._blockedUrl = void 0;
      const matched = matchingModifiers(url);
      const breaker = matched.find((m) => m.should_break(url));
      if (breaker == null ? void 0 : breaker.make_response) {
        this._fxaBreaker = breaker;
        this._fxaMatched = matched;
      } else if (matched.some((m) => m.modify_response)) {
        this._fxaMatched = matched;
      }
      super.open(method, url, async, user, password);
    }
    setRequestHeader(name2, value) {
      if (this._blockedUrl !== void 0) return;
      super.setRequestHeader(name2, value);
    }
    send(body) {
      var _a, _b;
      if (this._blockedUrl !== void 0) {
        this._synthesizeFromSimple({
          responseBody: textToBody(BLOCKED_BODY),
          statusCode: 200,
          responseHeaders: { "content-type": "application/json" }
        });
        return;
      }
      if ((_a = this._fxaBreaker) == null ? void 0 : _a.make_response) {
        this._synthesizeFromSimple(this._fxaBreaker.make_response(this._fxaUrl));
        return;
      }
      if ((_b = this._fxaMatched) == null ? void 0 : _b.length) this._armTransform();
      super.send(body);
    }
    abort() {
      if (this._blockedUrl !== void 0) return;
      super.abort();
    }
    getAllResponseHeaders() {
      if (this._blockedUrl !== void 0) return "content-type: application/json\r\n";
      return super.getAllResponseHeaders();
    }
    getResponseHeader(name2) {
      if (this._blockedUrl !== void 0) {
        return name2.toLowerCase() === "content-type" ? "application/json" : null;
      }
      return super.getResponseHeader(name2);
    }
    /**
     * 中断请求后合成一个假响应并手动派发完成事件。
     * 与 fetch 的 make_response 对齐，也复用了黑名单那条原本的 setTimeout 派发逻辑。
     */
    _synthesizeFromSimple(raw) {
      const url = this._blockedUrl ?? this._fxaUrl;
      const simple = resolveSimple(raw);
      const headers = simple.responseHeaders;
      const shadow = (prop, value) => Object.defineProperty(this, prop, { configurable: true, get: () => value });
      setTimeout(() => {
        const text = bodyToText(simple.responseBody);
        shadow("readyState", 4);
        shadow("status", simple.statusCode);
        shadow("statusText", "OK");
        shadow("responseURL", url);
        const type = this.responseType;
        shadow("responseText", type === "" || type === "text" ? text : "");
        let value;
        if (type === "json") {
          try {
            value = JSON.parse(text);
          } catch {
            value = text;
          }
        } else if (type === "arraybuffer") {
          value = simple.responseBody;
        } else if (type === "blob") {
          value = new Blob([simple.responseBody]);
        } else {
          value = text;
        }
        shadow("response", value);
        shadow(
          "getAllResponseHeaders",
          () => Object.entries(headers).map(([k, v]) => `${k}: ${v}\r
`).join("")
        );
        shadow("getResponseHeader", (name2) => {
          const lower = name2.toLowerCase();
          const key = Object.keys(headers).find((k) => k.toLowerCase() === lower);
          return key ? headers[key] : null;
        });
        this.dispatchEvent(new Event("readystatechange"));
        this.dispatchEvent(new ProgressEvent("load"));
        this.dispatchEvent(new ProgressEvent("loadend"));
      }, 0);
    }
    /**
     * 在实例上挂影子属性：等真实响应就绪（readyState=4），
     * 页面第一次读取时才同步套用 modify_response 并缓存结果。
     * 这样不用跟页面的 onload / onreadystatechange 争先后顺序。
     */
    _armTransform() {
      const type = this.responseType;
      if (type === "blob" || type === "document") return;
      const self = this;
      const matched = this._fxaMatched;
      const url = this._fxaUrl;
      const ensure = () => {
        if (self._fxaApplied || self.readyState !== 4) return;
        self._fxaSimple = resolveSimple(applyModifiers(url, matched, {
          responseBody: readXhrBody(self),
          statusCode: XHR_DESC.status.get.call(self),
          responseHeaders: readXhrHeaders(self)
        }));
        self._fxaApplied = true;
      };
      Object.defineProperty(this, "status", {
        configurable: true,
        get() {
          ensure();
          if (self._fxaApplied) return self._fxaSimple.statusCode;
          return XHR_DESC.status.get.call(self);
        }
      });
      Object.defineProperty(this, "responseText", {
        configurable: true,
        get() {
          ensure();
          const t = self.responseType;
          if (!self._fxaApplied || t !== "" && t !== "text") {
            return XHR_DESC.responseText.get.call(self);
          }
          return bodyToText(self._fxaSimple.responseBody);
        }
      });
      Object.defineProperty(this, "response", {
        configurable: true,
        get() {
          ensure();
          if (!self._fxaApplied) return XHR_DESC.response.get.call(self);
          const body = self._fxaSimple.responseBody;
          switch (self.responseType) {
            case "":
            case "text":
              return bodyToText(body);
            case "json":
              return JSON.parse(bodyToText(body));
            case "arraybuffer":
              return body;
            default:
              return XHR_DESC.response.get.call(self);
          }
        }
      });
      this.getAllResponseHeaders = function getAllResponseHeaders() {
        ensure();
        if (!self._fxaApplied) return XHR_GETALL.call(self);
        return Object.entries(self._fxaSimple.responseHeaders).map(([k, v]) => `${k}: ${v}\r
`).join("");
      };
      this.getResponseHeader = function getResponseHeader(name2) {
        ensure();
        if (!self._fxaApplied) return XHR_GETONE.call(self, name2);
        const lower = name2.toLowerCase();
        const key = Object.keys(self._fxaSimple.responseHeaders).find((k) => k.toLowerCase() === lower);
        return key ? self._fxaSimple.responseHeaders[key] : null;
      };
    }
  };
  const _exports$5 = [];
  let userState = {
    isLogin: false,
    userInfo: null
  };
  if (read("userState")) {
    userState = read("userState");
  }
  console.log("userState:", userState);
  async function getDetailedUserInfo() {
    if (!(userState == null ? void 0 : userState.isLogin) || !(userState == null ? void 0 : userState.userInfo)) {
      return null;
    }
    if (userState.userInfo.gender !== void 0 && userState.userInfo.recommend_gender !== void 0 && userState.userInfo.fans_num !== void 0 && userState.userInfo.following_num !== void 0 && userState.userInfo.is_author !== void 0 && userState.userInfo.author_desc !== void 0 && userState.userInfo.read_book_num !== void 0 && userState.userInfo.read_book_time !== void 0) {
      return userState.userInfo;
    }
    const response = await fetch$1("https://fanqienovel.com/reading/user/basic_info/get/v?aid=1967");
    const j = await response.json();
    if (j == null ? void 0 : j.data) {
      const data = j.data;
      userState.userInfo.gender = data.profile_gender;
      userState.userInfo.recommend_gender = data.gender;
      userState.userInfo.fans_num = data.fans_num;
      userState.userInfo.following_num = data.follow_user_num;
      userState.userInfo.is_author = data.is_author;
      userState.userInfo.author_desc = data.author_desc;
      userState.userInfo.read_book_num = data.read_book_num;
      userState.userInfo.read_book_time = BigInt(data.read_book_time);
      return userState.userInfo;
    }
    write("userState", userState);
    return userState.userInfo;
  }
  async function checkLogin() {
    var _a, _b, _c, _d, _e;
    const response = await fetch$1("https://fanqienovel.com/api/user/info/v2");
    const j = await response.json();
    const _userInfo = {
      id: (_a = j == null ? void 0 : j.data) == null ? void 0 : _a.id,
      username: (_b = j == null ? void 0 : j.data) == null ? void 0 : _b.name,
      avatar: (_c = j == null ? void 0 : j.data) == null ? void 0 : _c.avatar,
      desc: (_d = j == null ? void 0 : j.data) == null ? void 0 : _d.desc,
      age: (_e = j == null ? void 0 : j.data) == null ? void 0 : _e.age
    };
    if (j.code !== -1) {
      userState.isLogin = true;
      userState.userInfo = _userInfo;
      write("userState", userState);
      return true;
    } else {
      del("userState");
      return false;
    }
  }
  async function init() {
    var _a;
    await checkLogin();
    if (userState.isLogin) {
      console.log("Hello, ", (_a = userState == null ? void 0 : userState.userInfo) == null ? void 0 : _a.username);
    }
  }
  const PARA_PAGE_SIZE = 50;
  const PARA_REPLY_PAGE_SIZE = 10;
  const SOURCE_PARA = 502;
  const COMMENT_TYPE = 1;
  const GROUP_TYPE_ITEM = 15;
  function str(v) {
    return typeof v === "string" ? v : v == null ? "" : String(v);
  }
  function int(v) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  function parseUser(raw) {
    const base = (raw == null ? void 0 : raw.base_info) ?? {};
    return {
      user_id: str((raw == null ? void 0 : raw.user_id) || base.user_id),
      name: str((raw == null ? void 0 : raw.user_name) || base.user_name),
      avatar: str((raw == null ? void 0 : raw.user_avatar) || base.user_avatar)
    };
  }
  function urlSizeScore(url) {
    const sized = /:(\d+):(\d+)\./.exec(url);
    if (sized) {
      const w = Number(sized[1]) || 0;
      const h2 = Number(sized[2]) || 0;
      return Math.max(w, h2);
    }
    return 1e5;
  }
  function parseImages(raw) {
    const map = /* @__PURE__ */ new Map();
    const push = (url, type, w, h2) => {
      var _a;
      const s = str(url);
      if (!s) return;
      const key = ((_a = s.split("?")[0]) == null ? void 0 : _a.split("~tplv")[0]) ?? s;
      const next = {
        url: s,
        width: int(w),
        height: int(h2),
        emoji: int(type) === 2
      };
      const prev = map.get(key);
      if (!prev) {
        map.set(key, next);
        return;
      }
      if (urlSizeScore(s) > urlSizeScore(prev.url)) {
        map.set(key, { ...prev, url: s });
      }
    };
    if (Array.isArray(raw == null ? void 0 : raw.image_data)) {
      for (const d of raw.image_data) {
        push((d == null ? void 0 : d.web_uri) || (d == null ? void 0 : d.dynamic_url) || (d == null ? void 0 : d.url), d == null ? void 0 : d.image_type, d == null ? void 0 : d.width, d == null ? void 0 : d.height);
      }
    }
    if (Array.isArray(raw == null ? void 0 : raw.image_url)) {
      for (const u of raw.image_url) push(u, 0, 0, 0);
    }
    return [...map.values()];
  }
  function parseParaComment(raw) {
    const id = str(raw == null ? void 0 : raw.comment_id);
    if (!id) return null;
    return {
      id,
      text: str(raw == null ? void 0 : raw.text),
      create_time: int(raw == null ? void 0 : raw.create_timestamp),
      user: parseUser(raw == null ? void 0 : raw.user_info),
      digg_count: int(raw == null ? void 0 : raw.digg_count),
      reply_count: int(raw == null ? void 0 : raw.reply_count),
      images: parseImages(raw)
    };
  }
  function parseReply(raw) {
    const id = str(raw == null ? void 0 : raw.reply_id);
    if (!id) return null;
    const common = (raw == null ? void 0 : raw.common) ?? (raw == null ? void 0 : raw.Common) ?? {};
    const content = common.content ?? {};
    const stat = (raw == null ? void 0 : raw.stat) ?? {};
    const toUser = (raw == null ? void 0 : raw.reply_to_user_info) ?? {};
    const toBase = toUser.base_info ?? {};
    return {
      id,
      text: str(content.text),
      create_time: int(common.create_timestamp),
      digg_count: int(stat.digg_count),
      user: parseUser(common.user_info),
      to_name: str(toUser.user_name || toBase.user_name),
      images: parseImages(content.image_data_list ? { image_data: Object.values(content.image_data_list) } : {})
    };
  }
  async function getParaIdeaList(itemId2, bookId2, itemVersion = "0") {
    var _a;
    const res = await appGet("/ugc/idea/list/v", {
      item_id: itemId2,
      book_id: bookId2 || "0",
      item_version: itemVersion
    });
    const counts = /* @__PURE__ */ new Map();
    let data = null;
    try {
      data = (_a = res.json()) == null ? void 0 : _a.data;
    } catch {
    }
    if (!data) return { counts, item_version: "0", total: 0 };
    const ideaData = data.idea_data ?? {};
    let total = 0;
    for (const [k, v] of Object.entries(ideaData)) {
      const idx = Number(k);
      const count = int(v == null ? void 0 : v.idea_count);
      if (Number.isFinite(idx) && idx >= 0 && count > 0) {
        counts.set(idx, count);
        total += count;
      }
    }
    return { counts, item_version: str(data.newest_item_version || "0"), total };
  }
  async function getParaComments(itemId2, bookId2, paraIndex, itemVersion, offset = 0, count = PARA_PAGE_SIZE) {
    var _a;
    const res = await appGet("/ugc/idea/comment_list/v", {
      item_id: itemId2,
      book_id: bookId2 || "0",
      item_version: itemVersion || "0",
      para_index: String(paraIndex),
      offset: String(offset),
      count: String(count),
      sort: "0",
      query_type: "0"
    });
    let data = null;
    try {
      data = (_a = res.json()) == null ? void 0 : _a.data;
    } catch {
    }
    const list = Array.isArray(data == null ? void 0 : data.comments) ? data.comments : [];
    const comments = list.map(parseParaComment).filter((c) => !!c).sort((a, b) => b.digg_count - a.digg_count);
    return {
      comments,
      has_more: Boolean(data == null ? void 0 : data.has_more),
      next_offset: int(data == null ? void 0 : data.next_offset) || offset + comments.length,
      para_src_content: str(data == null ? void 0 : data.para_src_content)
    };
  }
  async function getParaReplies(itemId2, bookId2, commentId, cursor = "0", count = PARA_REPLY_PAGE_SIZE) {
    var _a;
    if (!commentId) return { replies: [], total: 0, has_more: false, cursor: "" };
    const res = await appRootPost(
      `/novel/commentapi/reply/list/${commentId}/v1`,
      JSON.stringify({
        business_param: { book_id: bookId2, need_count: true },
        comment_id: commentId,
        comment_source: SOURCE_PARA,
        comment_type: COMMENT_TYPE,
        count,
        cursor: String(cursor || "0"),
        group_id: itemId2,
        group_type: GROUP_TYPE_ITEM
      })
    );
    let data = null;
    try {
      data = (_a = res.json()) == null ? void 0 : _a.data;
    } catch {
    }
    const list = Array.isArray(data == null ? void 0 : data.reply_list) ? data.reply_list : [];
    const info = (data == null ? void 0 : data.comment_list_info) ?? {};
    return {
      replies: list.map(parseReply).filter((r) => !!r),
      total: int(info.total),
      has_more: Boolean(info.has_more),
      cursor: str(info.cursor)
    };
  }
  const EMOJI_UNICODE = {
    微笑: "😊",
    偷笑: "🤭",
    笑: "😄",
    什么: "🤔",
    害羞: "😳",
    爱慕: "😍",
    飞吻: "😘",
    奸笑: "😏",
    尬笑: "😅",
    思考: "🤔",
    撇嘴: "😒",
    做鬼脸: "😜",
    酷: "😎",
    翻白眼: "🙄",
    惊呆: "😲",
    震惊: "😱",
    送心: "💝",
    委屈: "🥺",
    快哭了: "😢",
    笑哭: "😂",
    哭: "😭",
    大笑: "😆",
    舔屏: "🤤",
    怒: "😡",
    捂脸: "🤦",
    吐: "🤮",
    恐惧: "😨",
    抓狂: "😫",
    敬礼: "🫡",
    石化: "😵",
    OK: "👌",
    赞: "👍",
    爱心: "❤️",
    伤心: "💔",
    KISS: "💋",
    懂了: "💡",
    探究: "🔍",
    重拳出击: "👊",
    吃瓜: "🍉",
    盯: "👀",
    你细品: "🤨",
    赶稿中: "✍️",
    注意: "⚠️",
    饱了: "😋",
    码住: "📌",
    学会了: "🎓",
    顶帖: "⬆️",
    求爆更: "🙏",
    求关注: "📣",
    我也强推: "🤝",
    雀食神作: "🐦",
    已种草: "🌱",
    书架加一: "📚"
  };
  const EMOJI_TOKEN = /\[[^\]]{1,12}\]/g;
  function renderCommentText(raw) {
    return document.createTextNode(raw.replace(EMOJI_TOKEN, (token) => EMOJI_UNICODE[token.slice(1, -1)] ?? token));
  }
  function formatTime(ts) {
    if (!Number.isFinite(ts) || ts <= 0) return "";
    const d = new Date(ts * 1e3);
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function makeImage(img) {
    const el = document.createElement("img");
    el.className = "fqa-pc-img";
    el.loading = "lazy";
    el.referrerPolicy = "no-referrer";
    el.alt = "";
    el.src = img.url;
    el.addEventListener("error", () => {
      el.style.visibility = "hidden";
    });
    return el;
  }
  function buildCommentItem(comment, itemId2, bookId2) {
    const item = document.createElement("div");
    item.className = "fqa-pc-item";
    const avatar = document.createElement("img");
    avatar.className = "fqa-pc-avatar";
    avatar.loading = "lazy";
    avatar.referrerPolicy = "no-referrer";
    avatar.alt = "";
    avatar.src = comment.user.avatar;
    avatar.addEventListener("error", () => {
      avatar.style.visibility = "hidden";
    });
    item.appendChild(avatar);
    const main = document.createElement("div");
    main.className = "fqa-pc-main";
    const userLine = document.createElement("div");
    userLine.className = "fqa-pc-user";
    userLine.textContent = comment.user.name || "读者";
    main.appendChild(userLine);
    const text = document.createElement("div");
    text.className = "fqa-pc-text";
    text.appendChild(renderCommentText(comment.text));
    main.appendChild(text);
    if (comment.images.length) {
      const imgs = document.createElement("div");
      imgs.className = "fqa-pc-imgs";
      for (const img of comment.images) imgs.appendChild(makeImage(img));
      main.appendChild(imgs);
    }
    const parts = [];
    if (comment.digg_count > 0) parts.push(`赞 ${comment.digg_count}`);
    if (comment.reply_count > 0) parts.push(`回复 ${comment.reply_count}`);
    const time = formatTime(comment.create_time);
    if (time) parts.push(time);
    if (parts.length) {
      const meta = document.createElement("div");
      meta.className = "fqa-pc-meta";
      meta.textContent = parts.join(" · ");
      main.appendChild(meta);
    }
    if (comment.reply_count > 0) {
      main.appendChild(buildRepliesBlock(comment.id, comment.reply_count, itemId2, bookId2));
    }
    item.appendChild(main);
    return item;
  }
  function buildReplyItem(reply) {
    const item = document.createElement("div");
    item.className = "fqa-pc-reply";
    const name2 = document.createElement("span");
    name2.className = "fqa-pc-reply-user";
    name2.textContent = (reply.user.name || "读者") + (reply.to_name ? ` 回复 @${reply.to_name}` : "") + "：";
    const text = document.createElement("span");
    text.className = "fqa-pc-reply-text";
    text.appendChild(renderCommentText(reply.text));
    item.appendChild(name2);
    item.appendChild(text);
    for (const img of reply.images) item.appendChild(makeImage(img));
    const parts = [];
    if (reply.digg_count > 0) parts.push(`赞 ${reply.digg_count}`);
    const time = formatTime(reply.create_time);
    if (time) parts.push(time);
    if (parts.length) {
      const meta = document.createElement("div");
      meta.className = "fqa-pc-reply-meta";
      meta.textContent = parts.join(" · ");
      item.appendChild(meta);
    }
    return item;
  }
  function buildRepliesBlock(commentId, replyCount, itemId2, bookId2) {
    const wrap = document.createElement("div");
    wrap.className = "fqa-pc-replies";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "fqa-pc-replies-toggle";
    toggle.textContent = `${replyCount} 条回复`;
    const list = document.createElement("div");
    list.className = "fqa-pc-replies-list";
    list.hidden = true;
    const sentinel = document.createElement("div");
    sentinel.className = "fqa-pc-reply-sentinel";
    let started = false;
    let loading = false;
    let hasMore = false;
    let failed = false;
    let cursor = "0";
    let total = replyCount;
    let observer2 = null;
    const appendReplies = (list_) => {
      const frag = document.createDocumentFragment();
      for (const r of list_) frag.appendChild(buildReplyItem(r));
      list.insertBefore(frag, sentinel);
    };
    const stopObserver = () => {
      observer2 == null ? void 0 : observer2.disconnect();
      observer2 = null;
    };
    async function loadPage() {
      if (loading || !hasMore) return;
      loading = true;
      sentinel.textContent = "加载中…";
      try {
        const res = await getParaReplies(itemId2, bookId2, commentId, cursor, PARA_REPLY_PAGE_SIZE);
        total = res.total || total;
        hasMore = res.has_more;
        cursor = res.cursor || cursor;
        if (res.replies.length) appendReplies(res.replies);
        sentinel.textContent = "";
        if (!hasMore) stopObserver();
      } catch (err) {
        console.warn("[fqa:段评] 加载回复失败:", err);
        hasMore = false;
        failed = true;
        sentinel.textContent = "";
      }
      loading = false;
    }
    function ensureObserver() {
      if (observer2 || !hasMore || typeof IntersectionObserver === "undefined") return;
      const root = list.closest(".fqa-pc-drawer-bd");
      observer2 = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void loadPage();
            break;
          }
        }
      }, { root, rootMargin: "0px 0px 80px 0px" });
      observer2.observe(sentinel);
    }
    async function start() {
      if (started) return;
      started = true;
      list.appendChild(sentinel);
      if (commentId) {
        hasMore = true;
        await loadPage();
      }
      if (!list.querySelector(".fqa-pc-reply")) {
        const empty = document.createElement("div");
        empty.className = "fqa-pc-reply-empty";
        empty.textContent = "暂无回复内容";
        list.insertBefore(empty, sentinel);
      }
      if (hasMore && !failed) ensureObserver();
      else sentinel.remove();
    }
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (list.hidden) {
        list.hidden = false;
        toggle.textContent = "收起回复";
        void start();
      } else {
        list.hidden = true;
        toggle.textContent = `${total || replyCount} 条回复`;
      }
    });
    wrap.appendChild(toggle);
    wrap.appendChild(list);
    return wrap;
  }
  const DRAWER_MAX_WIDTH = 420;
  const PAGE_MARGIN = 24;
  const SHIFT_EASE = "0.3s cubic-bezier(0.22, 0.61, 0.36, 1)";
  let els = null;
  let page = null;
  let shiftTargets = [];
  let themeObserver = null;
  let shiftReapplyTimer = null;
  function isParaDrawerOpen() {
    return Boolean(els == null ? void 0 : els.drawer.classList.contains("fqa-pc-show"));
  }
  function currentParaDrawerParagraph() {
    return (page == null ? void 0 : page.para) ?? null;
  }
  function ensureDrawer() {
    var _a;
    if (els && els.drawer.isConnected) return els;
    const drawer = document.createElement("div");
    drawer.className = "fqa-pc-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", "段评");
    drawer.innerHTML = '<div class="fqa-pc-drawer-inner"><div class="fqa-pc-drawer-hd"><div class="fqa-pc-drawer-title">评论 <span class="fqa-pc-drawer-count"></span></div><button class="fqa-pc-drawer-close" type="button" aria-label="关闭">✕</button></div><div class="fqa-pc-drawer-bd"></div></div>';
    const created = {
      drawer,
      inner: drawer.querySelector(".fqa-pc-drawer-inner"),
      body: drawer.querySelector(".fqa-pc-drawer-bd"),
      count: drawer.querySelector(".fqa-pc-drawer-count")
    };
    (_a = drawer.querySelector(".fqa-pc-drawer-close")) == null ? void 0 : _a.addEventListener("click", () => closeParaDrawer());
    drawer.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeParaDrawer();
    });
    window.addEventListener("resize", () => {
      if (page && (els == null ? void 0 : els.drawer.classList.contains("fqa-pc-show"))) applyShift(page.container, els);
    });
    created.body.addEventListener("scroll", () => {
      const st = page;
      if (!st || !st.hasMore || st.loading) return;
      const b = created.body;
      if (b.scrollTop + b.clientHeight >= b.scrollHeight - 120) {
        st.offset = st.next;
        void fetchPage(created, st, false);
      }
    });
    document.body.appendChild(drawer);
    els = created;
    watchReaderTheme();
    return created;
  }
  function findPanelEl(start) {
    const W = window.innerWidth;
    for (let n = start; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        const r = n.getBoundingClientRect();
        if (r.width > 0 && r.width <= W * 0.95) return n;
      }
    }
    return null;
  }
  function applyShift(container2, elements) {
    const W = window.innerWidth;
    const toolbar = document.querySelector(".reader-toolbar");
    const nav = document.querySelector(".muye-reader-nav");
    let target = findPanelEl(container2);
    if (!target) {
      const titleEl = document.querySelector("h1.muye-reader-title");
      if (titleEl) {
        const ancestors = /* @__PURE__ */ new Set();
        for (let n = titleEl; n; n = n.parentElement) ancestors.add(n);
        for (let n = container2; n; n = n.parentElement) {
          if (ancestors.has(n)) {
            target = n;
            break;
          }
        }
      }
    }
    if (!target) target = container2.closest(".muye-reader-inner") ?? container2;
    if (!target) return;
    const globalShift = parseFloat(document.documentElement.style.getPropertyValue("--fqa-pc-shift")) || 0;
    const shiftedByRoot = document.documentElement.classList.contains("fqa-pc-open") && target.matches(".muye-reader-box, .muye-reader-nav");
    const cur = shiftedByRoot || target.classList.contains("fqa-pc-shift-el") ? globalShift : 0;
    const r = target.getBoundingClientRect();
    const right = r.right + cur;
    const tw = toolbar ? toolbar.offsetWidth || 56 : 0;
    let origToolbarLeft = W - PAGE_MARGIN - tw;
    if (toolbar) {
      const m = /translateX\((-?[\d.]+)px\)/.exec(toolbar.style.transform || "");
      const curTb = (m == null ? void 0 : m[1]) ? parseFloat(m[1]) : 0;
      const tr = toolbar.getBoundingClientRect();
      if (tr.width > 0) origToolbarLeft = Math.round(tr.left - curTb);
    }
    const toolbarMaxLeft = W - PAGE_MARGIN - tw;
    const dwFull = Math.min(DRAWER_MAX_WIDTH, Math.round(W * 0.92));
    const maxShift = Math.max(0, Math.round(r.width - PAGE_MARGIN));
    let shift = origToolbarLeft + dwFull - toolbarMaxLeft;
    shift = Math.max(0, Math.min(shift, maxShift));
    let dw = dwFull;
    const toolbarFinalLeft = origToolbarLeft + dw - shift;
    if (toolbarFinalLeft > toolbarMaxLeft) dw = Math.max(220, dw - (toolbarFinalLeft - toolbarMaxLeft));
    const toolbarDelta = Math.round(dw - shift);
    const targets = [target];
    if (nav && target !== nav && !target.contains(nav)) targets.push(nav);
    for (const t of targets) t.classList.add("fqa-pc-shift-el");
    shiftTargets = targets;
    document.documentElement.classList.add("fqa-pc-open");
    const root = document.documentElement.style;
    const shiftValue = `${Math.round(shift)}px`;
    if (root.getPropertyValue("--fqa-pc-shift") !== shiftValue) {
      root.setProperty("--fqa-pc-shift", shiftValue);
    }
    const contentRight = `${Math.round(W - right)}px`;
    const contentWidth = `${Math.round(r.width)}px`;
    if (root.getPropertyValue("--fqa-pc-content-right") !== contentRight) {
      root.setProperty("--fqa-pc-content-right", contentRight);
    }
    if (root.getPropertyValue("--fqa-pc-content-width") !== contentWidth) {
      root.setProperty("--fqa-pc-content-width", contentWidth);
    }
    if (toolbar) {
      const transition = `transform ${SHIFT_EASE}`;
      const transform = Math.abs(toolbarDelta) > 0.5 ? `translateX(${toolbarDelta}px)` : "";
      if (toolbar.style.transition !== transition) toolbar.style.transition = transition;
      if (toolbar.style.transform !== transform) toolbar.style.transform = transform;
    }
    const leftValue = `${Math.round(right)}px`;
    if (elements.drawer.style.left !== leftValue) elements.drawer.style.left = leftValue;
    const drawerTransform = shift > 0.5 ? `translateX(${-Math.round(shift)}px)` : "";
    if (elements.drawer.style.transform !== drawerTransform) elements.drawer.style.transform = drawerTransform;
    const widthValue = `${Math.round(dw)}px`;
    if (elements.inner.style.width !== widthValue) elements.inner.style.width = widthValue;
    if (elements.drawer.style.width !== widthValue) elements.drawer.style.width = widthValue;
  }
  function clearShift() {
    document.documentElement.style.setProperty("--fqa-pc-shift", "0px");
    document.documentElement.classList.remove("fqa-pc-open");
    for (const t of shiftTargets) t.classList.remove("fqa-pc-shift-el");
    shiftTargets = [];
    const toolbar = document.querySelector(".reader-toolbar");
    if (toolbar) {
      toolbar.style.transition = `transform ${SHIFT_EASE}`;
      toolbar.style.transform = "";
    }
    if (els) {
      els.drawer.style.transform = "";
      els.drawer.style.width = "0px";
    }
  }
  function isReaderDark() {
    try {
      if (document.documentElement.getAttribute("muye-data-theme") === "dark") return true;
      if (document.querySelector('[muye-data-theme="dark"], .muye-reader-dark, .muye-reader-content-dark, .muye-reader-bg-dark')) return true;
      const bg = getComputedStyle(document.body).backgroundColor || "";
      const nums = bg.match(/\d+/g);
      if (nums && nums.length >= 3) {
        const [r = 255, g2 = 255, b = 255] = nums.map(Number);
        return r * 0.299 + g2 * 0.587 + b * 0.114 < 128;
      }
    } catch {
    }
    return false;
  }
  function watchReaderTheme() {
    if (themeObserver) return;
    themeObserver = new MutationObserver(() => {
      if (!isParaDrawerOpen()) return;
      const dark = isReaderDark();
      els == null ? void 0 : els.drawer.classList.toggle("fqa-pc-dark", dark);
      document.documentElement.classList.toggle("fqa-pc-reader-dark", dark);
      scheduleShiftReapply();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "muye-data-theme"],
      subtree: true
    });
  }
  function scheduleShiftReapply() {
    if (shiftStillApplied()) return;
    if (shiftReapplyTimer !== null) return;
    shiftReapplyTimer = window.setTimeout(() => {
      shiftReapplyTimer = null;
      if (!isParaDrawerOpen() || !page || !els) return;
      if (shiftStillApplied()) return;
      applyShift(page.container, els);
    }, 80);
  }
  function shiftStillApplied() {
    if (!shiftTargets.length) return false;
    return shiftTargets.every((el) => el.isConnected && el.classList.contains("fqa-pc-shift-el"));
  }
  async function openParaDrawer(container2, paragraph, chip, total, itemId2, bookId2, paraIndex, itemVersion) {
    const elements = ensureDrawer();
    const dark = isReaderDark();
    elements.drawer.classList.toggle("fqa-pc-dark", dark);
    document.documentElement.classList.toggle("fqa-pc-reader-dark", dark);
    elements.count.textContent = total ? `· 共 ${total} 条` : "";
    elements.body.innerHTML = '<div class="fqa-pc-status">加载中…</div>';
    elements.body.scrollTop = 0;
    if ((page == null ? void 0 : page.para) && page.para !== paragraph) page.para.classList.remove("fqa-pc-para-active");
    document.querySelectorAll(".fqa-pc-chip.fqa-pc-active").forEach((c) => c.classList.remove("fqa-pc-active"));
    paragraph == null ? void 0 : paragraph.classList.add("fqa-pc-para-active");
    chip == null ? void 0 : chip.classList.add("fqa-pc-active");
    elements.drawer.classList.add("fqa-pc-show");
    applyShift(container2, elements);
    const state2 = {
      itemId: itemId2,
      bookId: bookId2,
      paraIndex,
      itemVersion,
      offset: 0,
      next: 0,
      hasMore: false,
      loaded: 0,
      total,
      para: paragraph,
      container: container2,
      loading: false
    };
    page = state2;
    await fetchPage(elements, state2, true);
  }
  async function fetchPage(elements, state2, first) {
    if (state2.loading) return;
    state2.loading = true;
    let comments = [];
    let hasMore = false;
    let next = state2.offset;
    try {
      const res = await getParaComments(
        state2.itemId,
        state2.bookId,
        state2.paraIndex,
        state2.itemVersion,
        state2.offset,
        PARA_PAGE_SIZE
      );
      comments = res.comments;
      hasMore = res.has_more;
      next = res.next_offset;
    } catch (err) {
      console.warn("[fqa:段评] 加载失败:", err);
      state2.loading = false;
      if (first) elements.body.innerHTML = '<div class="fqa-pc-status">加载失败，请稍后重试</div>';
      return;
    }
    if (page !== state2) {
      state2.loading = false;
      return;
    }
    if (first) elements.body.innerHTML = "";
    if (first && !comments.length) {
      elements.body.innerHTML = '<div class="fqa-pc-status">暂无评论</div>';
      state2.loading = false;
      return;
    }
    let list = elements.body.querySelector(".fqa-pc-list");
    if (!list) {
      list = document.createElement("div");
      list.className = "fqa-pc-list";
      elements.body.appendChild(list);
    }
    const frag = document.createDocumentFragment();
    for (const c of comments) frag.appendChild(buildCommentItem(c, state2.itemId, state2.bookId));
    list.appendChild(frag);
    state2.loaded += comments.length;
    state2.hasMore = hasMore;
    state2.next = next || state2.offset + comments.length;
    elements.count.textContent = state2.total ? `· 已加载 ${state2.loaded} / 共 ${state2.total} 条` : `· 已加载 ${state2.loaded} 条`;
    state2.loading = false;
    if (state2.hasMore && elements.body.scrollHeight <= elements.body.clientHeight + 4) {
      state2.offset = state2.next;
      await fetchPage(elements, state2, false);
    }
  }
  function closeParaDrawer() {
    var _a;
    (_a = page == null ? void 0 : page.para) == null ? void 0 : _a.classList.remove("fqa-pc-para-active");
    document.querySelectorAll(".fqa-pc-chip.fqa-pc-active").forEach((c) => c.classList.remove("fqa-pc-active"));
    page = null;
    if (els) {
      els.drawer.classList.remove("fqa-pc-show");
      els.drawer.style.width = "0px";
    }
    clearShift();
  }
  const paraCommentCss = '/* 段评（段落评论）：段尾标记 + 右侧抽屉 + 章末评论区块。 */\n\n/*\n * 段落末尾的段评标记。\n *\n * 外形交给内联 SVG（.fqa-pc-shape）来画：左下角要「把圆角换成尖」，\n * 只用 border-radius 拼不出带描边的缺口，之前用旋转方块总会在圆角旁边\n * 多出一条线。SVG 一条路径就能把圆角矩形和尖一起描出来。\n */\n.fqa-pc-chip {\n	--fqa-chip-border: #a8a8a8;\n	--fqa-chip-bg: var(--web-bg, #f7f4ee);\n	position: relative;\n	display: inline-flex;\n	align-items: center;\n	justify-content: center;\n	min-width: 1.8em;\n	height: 1.5em;\n	margin: 0 0.45em 0.2em 0.35em;\n	padding: 0 0.3em;\n	box-sizing: border-box;\n	font-size: 0.66em;\n	line-height: 1;\n	color: #6e6e6e;\n	background: transparent;\n	border: 0;\n	vertical-align: 0.12em;\n	cursor: pointer;\n	user-select: none;\n	white-space: nowrap;\n	text-indent: 0;\n	transition: color 0.15s ease;\n}\n\n/* 气泡外形：铺满气泡，overflow 放开让左下角的尖伸到框外 */\n.fqa-pc-shape {\n	position: absolute;\n	inset: 0;\n	width: 100%;\n	height: 100%;\n	overflow: visible;\n	pointer-events: none;\n}\n\n.fqa-pc-shape path {\n	fill: var(--fqa-chip-bg);\n	stroke: var(--fqa-chip-border);\n	stroke-width: 1.5;\n	stroke-linejoin: round;\n	/* 路径会被横向拉伸，这个保证线宽恒为 1.5px */\n	vector-effect: non-scaling-stroke;\n	transition: stroke 0.15s ease;\n}\n\n.fqa-pc-chip:hover {\n	color: #3a3a3a;\n	--fqa-chip-border: #6e6e6e;\n}\n\n.fqa-pc-chip.fqa-pc-active {\n	color: var(--web-brand_normal, #f14646);\n	--fqa-chip-border: currentColor;\n}\n\n.fqa-pc-count {\n	position: relative;\n	/* 数字在 em 框里视觉上偏上，往下压一点点才看着居中 */\n	top: 0.07em;\n	flex: 1 1 auto;\n	text-align: center;\n	line-height: 1;\n	font-weight: 500;\n	font-variant-numeric: tabular-nums;\n}\n\n/* 当前打开的段评段落：浅灰高亮 */\n.fqa-pc-para-active {\n	background: rgba(31, 35, 41, 0.055) !important;\n	border-radius: 4px;\n	box-shadow: 0 0 0 6px rgba(31, 35, 41, 0.055);\n}\n\n/* 打开抽屉时被左移的元素（正文块 / 顶部导航） */\n.fqa-pc-shift-el {\n	transform: translateX(calc(-1 * var(--fqa-pc-shift, 0px))) !important;\n	transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);\n}\n\n.fqa-pc-list {\n	display: block;\n}\n\n.fqa-pc-status {\n	padding: 24px 0;\n	color: #9a9a9a;\n	font-size: 13px;\n	text-align: center;\n}\n\n/* 章节顶部「讨论热烈」提示 */\n.fqa-pc-summary {\n	display: flex;\n	align-items: center;\n	gap: 6px;\n	margin: 0 0 18px;\n	color: var(--web-gray_40, #8a8a8a);\n	font-size: 0.8em;\n	text-indent: 0;\n}\n\n.fqa-pc-summary::before {\n	content: "🔥";\n}\n\n/* 段评抽屉：锚在正文右缘，宽度由 0 向右展开 */\n.fqa-pc-drawer {\n	position: fixed;\n	top: 0;\n	right: auto;\n	bottom: 0;\n	left: 50%;\n	width: 0;\n	overflow: hidden;\n	z-index: 2147483601;\n	transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);\n}\n\n.fqa-pc-drawer-inner {\n	display: flex;\n	flex-direction: column;\n	width: min(420px, 92vw);\n	height: 100%;\n	box-sizing: border-box;\n	background: #fff;\n	color: #1f2329;\n	border-left: 1px solid rgba(31, 35, 41, 0.1);\n	box-shadow: -8px 0 24px rgba(0, 0, 0, 0.08);\n	font-size: 14px;\n	line-height: 1.6;\n}\n\n.fqa-pc-drawer-hd {\n	display: flex;\n	align-items: center;\n	justify-content: space-between;\n	gap: 8px;\n	padding: 14px 16px;\n	border-bottom: 1px solid rgba(31, 35, 41, 0.08);\n}\n\n.fqa-pc-drawer-title {\n	font-size: 15px;\n	font-weight: 600;\n}\n\n.fqa-pc-drawer-count {\n	margin-left: 4px;\n	color: #9a9a9a;\n	font-size: 12px;\n	font-weight: 400;\n}\n\n.fqa-pc-drawer-close {\n	display: flex;\n	align-items: center;\n	justify-content: center;\n	width: 28px;\n	height: 28px;\n	border: 0;\n	border-radius: 6px;\n	background: transparent;\n	color: #8f959e;\n	font-size: 15px;\n	cursor: pointer;\n}\n\n.fqa-pc-drawer-close:hover {\n	background: rgba(31, 35, 41, 0.06);\n	color: #1f2329;\n}\n\n.fqa-pc-drawer-bd {\n	flex: 1 1 auto;\n	overflow-y: auto;\n	overscroll-behavior: contain;\n	padding: 0 16px;\n}\n\n.fqa-pc-drawer-snippet {\n	margin: 10px 0 0;\n	color: #9a9a9a;\n	font-size: 12px;\n}\n\n/* 单条评论 */\n.fqa-pc-item {\n	display: flex;\n	gap: 10px;\n	padding: 14px 0;\n	border-top: 1px solid rgba(31, 35, 41, 0.06);\n}\n\n.fqa-pc-item:first-child {\n	border-top: none;\n}\n\n.fqa-pc-item > .fqa-pc-avatar {\n	width: 34px !important;\n	height: 34px !important;\n	border-radius: 50%;\n	flex: 0 0 auto;\n	object-fit: cover;\n	background: rgba(31, 35, 41, 0.08);\n}\n\n.fqa-pc-main {\n	flex: 1 1 auto;\n	min-width: 0;\n}\n\n.fqa-pc-user {\n	font-size: 13px;\n	color: #8f959e;\n}\n\n.fqa-pc-text {\n	margin-top: 2px;\n	font-size: 15px;\n	color: #1f2329;\n	word-break: break-word;\n	white-space: pre-wrap;\n	text-indent: 0;\n}\n\n.fqa-pc-imgs {\n	display: flex;\n	flex-wrap: wrap;\n	gap: 8px;\n	margin-top: 8px;\n}\n\n.fqa-pc-imgs > .fqa-pc-img {\n	max-width: min(100%, 260px) !important;\n	max-height: 260px !important;\n	width: auto !important;\n	height: auto !important;\n	border-radius: 8px;\n	object-fit: contain;\n	background: rgba(127, 127, 127, 0.07);\n}\n\n.fqa-pc-meta {\n	display: flex;\n	flex-wrap: wrap;\n	gap: 14px;\n	margin-top: 6px;\n	font-size: 12px;\n	color: #9a9a9a;\n}\n\n/* 楼中楼 */\n.fqa-pc-replies {\n	margin-top: 8px;\n}\n\n.fqa-pc-replies-toggle {\n	padding: 0;\n	border: 0;\n	background: transparent;\n	color: var(--web-brand_normal, #f14646);\n	font-size: 12px;\n	font-family: inherit;\n	cursor: pointer;\n}\n\n.fqa-pc-replies-toggle:hover {\n	text-decoration: underline;\n}\n\n.fqa-pc-replies-list {\n	margin-top: 8px;\n	padding: 8px 10px;\n	border-radius: 8px;\n	background: rgba(127, 127, 127, 0.08);\n	display: flex;\n	flex-direction: column;\n	gap: 7px;\n}\n\n.fqa-pc-replies-list[hidden] {\n	display: none;\n}\n\n.fqa-pc-reply {\n	font-size: 14px;\n	line-height: 1.65;\n	word-break: break-word;\n}\n\n.fqa-pc-reply-user {\n	color: #8f959e;\n}\n\n.fqa-pc-reply-more,\n.fqa-pc-reply-sentinel,\n.fqa-pc-reply-empty {\n	min-height: 1px;\n	font-size: 12px;\n	color: #9a9a9a;\n}\n\n/* 楼中楼的点赞数 / 时间 */\n.fqa-pc-reply-meta {\n	margin-top: 2px;\n	font-size: 11px;\n	line-height: 1.4;\n	color: #9a9a9a;\n}\n\n/* 章末评论区块 */\n.fqa-cc-section {\n	margin-top: 2.4em;\n	padding: 1.1em 1.2em 0.4em;\n	border: 1px solid rgba(127, 127, 127, 0.18);\n	border-radius: 12px;\n	background: rgba(127, 127, 127, 0.05);\n	text-indent: 0;\n	line-height: 1.7;\n}\n\n.fqa-cc-section .fqa-pc-item {\n	text-indent: 0;\n}\n\n.fqa-cc-title {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	margin: 0 0 0.2em;\n	padding-bottom: 0.6em;\n	border-bottom: 1px solid rgba(127, 127, 127, 0.15);\n	font-size: 1em;\n	font-weight: 600;\n	color: #1f2329;\n}\n\n.fqa-cc-title::before {\n	content: "";\n	width: 3px;\n	height: 1em;\n	border-radius: 2px;\n	background: var(--web-brand_normal, #f14646);\n}\n\n/* 段评开关：作为工具栏项（放在「字号」下面），样式沿用站点 */\n.fqa-pc-tool {\n	cursor: pointer;\n}\n\n.fqa-pc-tool .reader-toolbar-item-icon {\n	display: flex;\n	align-items: center;\n	justify-content: center;\n}\n\n.fqa-pc-tool.fqa-pc-tool-on .reader-toolbar-item-icon,\n.fqa-pc-tool.fqa-pc-tool-on .reader-toolbar-item-font {\n	color: var(--web-brand_normal, #f14646);\n}\n\n.fqa-pc-tool.fqa-pc-tool-off .reader-toolbar-item-icon,\n.fqa-pc-tool.fqa-pc-tool-off .reader-toolbar-item-font {\n	opacity: 0.45;\n}\n\n/* 兜底：没有站点工具栏时的浮动开关 */\n.fqa-pc-toggle {\n	position: fixed;\n	right: 16px;\n	bottom: 88px;\n	z-index: 2147483000;\n	padding: 6px 12px;\n	border: none;\n	border-radius: 999px;\n	background: var(--web-brand_normal, #f14646);\n	color: #fff;\n	font-size: 13px;\n	line-height: 1.4;\n	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);\n	cursor: pointer;\n	user-select: none;\n}\n\n.fqa-pc-toggle.fqa-pc-toggle-off {\n	background: #9a9a9a;\n}\n\nhtml.fqa-pc-off .fqa-pc-chip,\nhtml.fqa-pc-off .fqa-pc-summary {\n	display: none !important;\n}\n\n/* 深色（阅读器深色主题 / 系统深色） */\n.fqa-pc-drawer.fqa-pc-dark .fqa-pc-drawer-inner {\n	background: #1f1f23;\n	color: #e6e6e6;\n	border-left-color: rgba(255, 255, 255, 0.12);\n}\n\n.fqa-pc-dark .fqa-pc-drawer-hd {\n	border-bottom-color: rgba(255, 255, 255, 0.1);\n}\n\n.fqa-pc-dark .fqa-pc-text {\n	color: #e6e6e6;\n}\n\n.fqa-pc-dark .fqa-pc-item {\n	border-top-color: rgba(255, 255, 255, 0.08);\n}\n\n.fqa-pc-dark .fqa-pc-avatar {\n	background: rgba(255, 255, 255, 0.12);\n}\n\n.fqa-pc-dark .fqa-pc-drawer-close:hover {\n	background: rgba(255, 255, 255, 0.1);\n	color: #fff;\n}\n\n.fqa-pc-dark .fqa-pc-user,\n.fqa-pc-dark .fqa-pc-meta,\n.fqa-pc-dark .fqa-pc-reply-meta,\n.fqa-pc-dark .fqa-pc-drawer-snippet,\n.fqa-pc-dark .fqa-pc-drawer-count,\n.fqa-pc-dark .fqa-pc-status {\n	color: #9a9a9a;\n}\n\n.fqa-pc-dark .fqa-pc-replies-list {\n	background: rgba(255, 255, 255, 0.08);\n}\n\nhtml.fqa-pc-reader-dark .fqa-pc-para-active {\n	background: rgba(255, 255, 255, 0.08) !important;\n	box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08);\n}\n\nhtml.fqa-pc-reader-dark .fqa-pc-chip {\n	--fqa-chip-border: #555;\n	color: #8a8a8a;\n}\n\nhtml.fqa-pc-reader-dark .fqa-pc-chip:hover {\n	--fqa-chip-border: #b3b3b3;\n	color: #e6e6e6;\n}\n\nhtml.fqa-pc-reader-dark .fqa-cc-section {\n	background: rgba(255, 255, 255, 0.06);\n	border-color: rgba(255, 255, 255, 0.12);\n}\n\nhtml.fqa-pc-reader-dark .fqa-cc-title {\n	color: #e6e6e6;\n	border-bottom-color: rgba(255, 255, 255, 0.12);\n}\n\n@media (prefers-color-scheme: dark) {\n	.fqa-pc-drawer-inner {\n		background: #1f1f23;\n		color: #e6e6e6;\n		border-left-color: rgba(255, 255, 255, 0.12);\n	}\n\n	.fqa-pc-drawer-hd {\n		border-bottom-color: rgba(255, 255, 255, 0.1);\n	}\n\n	.fqa-pc-text {\n		color: #e6e6e6;\n	}\n\n	.fqa-pc-item {\n		border-top-color: rgba(255, 255, 255, 0.08);\n	}\n\n	.fqa-pc-avatar {\n		background: rgba(255, 255, 255, 0.12);\n	}\n\n	.fqa-pc-drawer-close:hover {\n		background: rgba(255, 255, 255, 0.1);\n		color: #fff;\n	}\n\n	.fqa-pc-user,\n	.fqa-pc-meta,\n	.fqa-pc-drawer-snippet,\n	.fqa-pc-drawer-count,\n	.fqa-pc-status {\n		color: #9a9a9a;\n	}\n}\n';
  const TOOL_ID = "fqa-pc-toggle";
  const STYLE_ID$5 = "fqa-pc-style";
  let catalogClickBound = false;
  let catalogScrollPatched = false;
  let catalogWatchBound = false;
  function ensureCss() {
    if (document.getElementById(STYLE_ID$5)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID$5;
    style.textContent = paraCommentCss;
    document.head.appendChild(style);
  }
  const TOOL_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 4.5c-4.7 0-8.5 3.3-8.5 7.3 0 1.9.8 3.6 2.2 4.9-.2 1.2-.7 2.3-1.5 3.2 1.7-.2 3.2-.8 4.4-1.7.9.2 1.9.4 3.4.4 4.7 0 8.5-3.3 8.5-7.3S16.7 4.5 12 4.5z"/></svg>';
  function readerParagraphs(container2) {
    const root = container2.querySelector("article") ?? container2;
    let els2 = Array.from(root.querySelectorAll("p")).filter((el) => (el.textContent ?? "").trim());
    if (!els2.length) {
      els2 = Array.from(root.children).filter(
        (el) => el.nodeType === 1 && (el.tagName === "P" || el.tagName === "DIV") && Boolean((el.textContent ?? "").trim())
      );
    }
    return els2;
  }
  function applyParaCommentState() {
    document.documentElement.classList.toggle("fqa-pc-off", !settings$1.paraComment);
    const el = document.getElementById(TOOL_ID);
    if (!el) return;
    if (el.classList.contains("fqa-pc-tool")) {
      el.classList.toggle("fqa-pc-tool-on", settings$1.paraComment);
      el.classList.toggle("fqa-pc-tool-off", !settings$1.paraComment);
    } else {
      el.textContent = settings$1.paraComment ? "段评 开" : "段评 关";
      el.classList.toggle("fqa-pc-toggle-off", !settings$1.paraComment);
    }
  }
  const SVG_NS = "http://www.w3.org/2000/svg";
  function buildChipShape() {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "fqa-pc-shape");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute(
      "d",
      "M 19 3 H 81 A 16 16 0 0 1 97 19 V 81 A 16 16 0 0 1 81 97 H -8 L 3 74 V 19 A 16 16 0 0 1 19 3 Z"
    );
    svg.appendChild(path);
    return svg;
  }
  function initCatalogClickOutside() {
    if (catalogClickBound) return;
    catalogClickBound = true;
    document.addEventListener("click", (event) => {
      var _a;
      const target = event.target;
      if (!target) return;
      if (!document.querySelector(".reader-catalog")) return;
      if (target.closest(".reader-catalog, .reader-toolbar, .catalog-mask")) return;
      (_a = document.querySelector(".catalog-mask")) == null ? void 0 : _a.click();
    }, true);
  }
  function patchCatalogScroll() {
    if (catalogScrollPatched) return;
    catalogScrollPatched = true;
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(arg) {
      if (this.closest(".reader-catalog")) {
        const options = typeof arg === "boolean" ? { block: "start" } : { ...arg ?? {} };
        options.behavior = "auto";
        original.call(this, options);
        return;
      }
      original.call(this, arg);
    };
  }
  function watchCatalogOpen() {
    if (catalogWatchBound) return;
    catalogWatchBound = true;
    const locate = () => {
      const panel = document.querySelector(".reader-catalog");
      if (!panel) return;
      const active = panel.querySelector(".reader-catalog-chapters .chapter.active");
      if (!active) return;
      active.scrollIntoView({ block: "start", behavior: "auto" });
    };
    const observer2 = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(".reader-catalog") || node.querySelector(".reader-catalog")) {
            locate();
            requestAnimationFrame(locate);
            return;
          }
        }
      }
    });
    observer2.observe(document.body, { childList: true, subtree: true });
  }
  function initParaCommentToggle() {
    ensureCss();
    initCatalogClickOutside();
    patchCatalogScroll();
    watchCatalogOpen();
    const toolbar = document.querySelector(".reader-toolbar");
    if (toolbar) {
      let item = document.getElementById(TOOL_ID);
      if (!item || !toolbar.contains(item)) {
        item = document.createElement("div");
        item.id = TOOL_ID;
        item.className = "reader-toolbar-item fqa-pc-tool";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `<div class="reader-toolbar-item-icon">${TOOL_ICON}</div><div class="reader-toolbar-item-font">段评</div>`;
        item.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          settings$1.paraComment = !settings$1.paraComment;
          applyParaCommentState();
        }, true);
        const items = Array.from(toolbar.querySelectorAll(".reader-toolbar-item"));
        const fontItem = items.find((el) => {
          var _a;
          return /字号|字体/.test(((_a = el.querySelector(".reader-toolbar-item-font")) == null ? void 0 : _a.textContent) ?? "");
        });
        if (fontItem) fontItem.insertAdjacentElement("afterend", item);
        else toolbar.appendChild(item);
      }
      applyParaCommentState();
      return;
    }
    let button = document.getElementById(TOOL_ID);
    if (!button) {
      button = document.createElement("button");
      button.id = TOOL_ID;
      button.type = "button";
      button.className = "fqa-pc-toggle";
      button.addEventListener("click", () => {
        settings$1.paraComment = !settings$1.paraComment;
        applyParaCommentState();
      });
      document.body.appendChild(button);
    }
    applyParaCommentState();
  }
  async function attachChapterComments(container2, itemId2, bookId2) {
    var _a, _b, _c, _d;
    if (container2.querySelector(".fqa-cc-section")) return;
    const out = [];
    let offset = 0;
    for (let page2 = 0; page2 < 3; page2++) {
      const res = await appGet("/ugc/novel_comment/item/v", {
        item_id: itemId2,
        offset: String(offset),
        count: "50",
        ...bookId2 ? { book_id: bookId2 } : {}
      });
      let data = null;
      try {
        data = (_a = res.json()) == null ? void 0 : _a.data;
      } catch {
        break;
      }
      const list = Array.isArray(data == null ? void 0 : data.comment) ? data.comment : [];
      for (const c of list) {
        const id = String((c == null ? void 0 : c.comment_id) ?? "");
        if (!id) continue;
        out.push({
          id,
          text: String((c == null ? void 0 : c.text) ?? ""),
          create_time: Number(c == null ? void 0 : c.create_timestamp) || 0,
          user: {
            user_id: String(((_b = c == null ? void 0 : c.user_info) == null ? void 0 : _b.user_id) ?? ""),
            name: String(((_c = c == null ? void 0 : c.user_info) == null ? void 0 : _c.user_name) ?? ""),
            avatar: String(((_d = c == null ? void 0 : c.user_info) == null ? void 0 : _d.user_avatar) ?? "")
          },
          digg_count: Number(c == null ? void 0 : c.digg_count) || 0,
          reply_count: Number(c == null ? void 0 : c.reply_count) || 0,
          images: []
        });
      }
      const next = Number(data == null ? void 0 : data.next_offset);
      if (!(data == null ? void 0 : data.has_more) || !Number.isFinite(next) || next === offset || !list.length) break;
      offset = next;
    }
    if (!out.length) return;
    const root = container2.querySelector("article") ?? container2;
    const section = document.createElement("section");
    section.className = "fqa-cc-section";
    const head = document.createElement("h3");
    head.className = "fqa-cc-title";
    head.textContent = `本章评论 · ${out.length} 条`;
    section.appendChild(head);
    for (const c of out) section.appendChild(buildCommentItem(c, itemId2, bookId2));
    root.appendChild(section);
  }
  async function attachParaComments(container2, itemId2, bookId2) {
    if (!itemId2) return;
    ensureCss();
    const paragraphs = readerParagraphs(container2);
    if (!paragraphs.length) return;
    const idea = await getParaIdeaList(itemId2, bookId2);
    if (!idea.counts.size) return;
    const summary = document.createElement("div");
    summary.className = "fqa-pc-summary";
    summary.textContent = `讨论热烈：本章含 ${idea.total} 条段评，${idea.counts.size} 段有评论`;
    container2.insertBefore(summary, container2.firstChild);
    for (const [idx, count] of idea.counts) {
      const paragraph = paragraphs[idx];
      if (!paragraph) continue;
      paragraph.dataset.fqaParaIdx = String(idx);
      const chip = document.createElement("span");
      chip.className = "fqa-pc-chip";
      chip.title = "查看段评";
      chip.appendChild(buildChipShape());
      const countEl = document.createElement("span");
      countEl.className = "fqa-pc-count";
      countEl.textContent = String(count);
      chip.appendChild(countEl);
      paragraph.appendChild(chip);
    }
    bindParagraphToggle(container2, itemId2, bookId2, idea);
    void attachChapterComments(container2, itemId2, bookId2);
  }
  function bindParagraphToggle(container2, itemId2, bookId2, idea) {
    var _a;
    const holder = container2;
    (_a = holder.__fqaParaToggle) == null ? void 0 : _a.abort();
    const controller = new AbortController();
    holder.__fqaParaToggle = controller;
    container2.addEventListener("click", (event) => {
      const target = event.target;
      if (!target) return;
      if (target.closest("a, sup, button, input, textarea, select")) return;
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) return;
      const paragraph = target.closest("p[data-fqa-para-idx]");
      if (!paragraph) return;
      const idx = Number(paragraph.dataset.fqaParaIdx);
      const count = idea.counts.get(idx);
      if (!Number.isFinite(idx) || count === void 0) return;
      if (isParaDrawerOpen() && currentParaDrawerParagraph() === paragraph) {
        closeParaDrawer();
        return;
      }
      const chip = paragraph.querySelector(".fqa-pc-chip");
      void openParaDrawer(container2, paragraph, chip, count, itemId2, bookId2, idx, idea.item_version);
    }, { signal: controller.signal });
  }
  let currentBook = null;
  let latestItemId = null;
  let currentChapterWithContent = null;
  const SCRIPT_CONTAINER_ID = "fqa-reader-content";
  let comicObserver = null;
  addResponseModifier({
    matcher: (url) => url.indexOf("/reading/bookapi/bookshelf/check/") !== -1 && location.pathname.startsWith("/reader"),
    should_break: () => true,
    make_response: () => {
      const body = JSON.stringify({
        code: 0,
        message: "SUCCESS",
        data: 0
      });
      return {
        responseBody: body,
        statusCode: 200,
        responseHeaders: {
          "content-type": "application/json; charset=utf-8",
          "content-length": String(new TextEncoder().encode(body).length)
        }
      };
    }
  });
  function ensureScriptContainer(readerContainer, comic) {
    let scriptContainer = document.getElementById(SCRIPT_CONTAINER_ID);
    if (!scriptContainer) {
      scriptContainer = cloneElement(readerContainer);
      scriptContainer.id = SCRIPT_CONTAINER_ID;
      scriptContainer.classList.add("fqa");
      readerContainer.insertAdjacentElement("beforebegin", scriptContainer);
    }
    scriptContainer.classList.toggle("fqa-comic-reader", comic);
    if (settings$1.allowCopy) scriptContainer.classList.remove("noselect");
    comicObserver == null ? void 0 : comicObserver.disconnect();
    comicObserver = null;
    scriptContainer.innerHTML = "";
    readerContainer.classList.add("fqa-hide");
    return scriptContainer;
  }
  async function insertContent() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    const itemId2 = ((_a = window.location.pathname.split("/").pop()) == null ? void 0 : _a.substring(0, 19)) || "";
    if (!itemId2) {
      console.warn("No item_id found in URL");
      return;
    }
    latestItemId = itemId2;
    closeParaDrawer();
    const chapter = await getChapter(itemId2);
    if (!chapter) {
      console.warn("No chapter found for item_id:", itemId2);
      return;
    }
    if (latestItemId !== itemId2) {
      console.debug("Stale chapter response discarded:", itemId2);
      return;
    }
    console.log("Chapter:", chapter);
    currentChapterWithContent = chapter;
    const pageState = unsafeWindow.__INITIAL_STATE__;
    const chapterTitle = ((_b = chapter.novel_data) == null ? void 0 : _b.title) || ((_d = (_c = pageState == null ? void 0 : pageState.reader) == null ? void 0 : _c.chapterData) == null ? void 0 : _d.title);
    if (typeof chapter.content === "string") {
      void applyBookCss((_e = chapter.novel_data) == null ? void 0 : _e.css_map, "#fqa-reader-content");
      const dp = new DOMParser();
      const doc = dp.parseFromString(chapter.content, "text/html");
      const body = doc.body;
      body.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());
      let article = body.querySelector("article");
      let toProcess = article || body;
      processFootnotes(toProcess);
      for (let i2 = 0; i2 < toProcess.childNodes.length; i2++) {
        if (i2 < 2 && ((_g = (_f = toProcess.childNodes[i2]) == null ? void 0 : _f.innerHTML) == null ? void 0 : _g.includes(chapterTitle))) {
          toProcess.removeChild(toProcess.childNodes[i2]);
          break;
        }
      }
      if (!article) {
        article = document.createElement("article");
        article.innerHTML = toProcess.innerHTML;
        toProcess = article;
      }
      const readerContainer = document.querySelector("div.muye-reader-content:not(.fqa)");
      if (readerContainer) {
        const scriptContainer = ensureScriptContainer(readerContainer, false);
        scriptContainer.appendChild(toProcess);
        bindFootnoteInteraction(scriptContainer);
        if (settings$1.paraComment) {
          void attachParaComments(scriptContainer, itemId2, ((_h = chapter.novel_data) == null ? void 0 : _h.book_id) ?? "");
        }
      }
    } else if (chapter.content.picInfos) {
      if (chapter.content.encrypt) {
        const imgs = [];
        for (let i2 = 0; i2 < chapter.content.picInfos.length; i2++) {
          const picInfo = chapter.content.picInfos[i2];
          const img = document.createElement("img");
          img.className = "fqa-comic-img fqa-comic-encrypted";
          img.alt = `第${i2 + 1}页`;
          img.dataset.encryptedUrl = picInfo.picUrl;
          img.dataset.encryptKey = chapter.content.encrypt_key;
          img.dataset.pageIndex = i2.toString();
          img.style.minHeight = "500px";
          img.style.backgroundColor = "#f0f0f0";
          imgs.push(img);
        }
        const readerContainer = document.querySelector("div.muye-reader-content:not(.fqa)");
        if (readerContainer) {
          const scriptContainer = ensureScriptContainer(readerContainer, true);
          imgs.forEach((img) => scriptContainer.appendChild(img));
          const observer2 = new IntersectionObserver(
            async (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  const img = entry.target;
                  if (img.dataset.encryptedUrl && img.dataset.encryptKey && !img.src) {
                    observer2.unobserve(img);
                    try {
                      const encryptedBuffer = await fetchArrayBuffer(
                        img.dataset.encryptedUrl
                      );
                      const decryptedBuffer = await decryptComicImage(
                        encryptedBuffer,
                        img.dataset.encryptKey
                      );
                      const blob = new Blob([decryptedBuffer], { type: "image/jpeg" });
                      const blobUrl = URL.createObjectURL(blob);
                      img.src = blobUrl;
                      img.style.minHeight = "";
                      img.style.backgroundColor = "";
                      img.onload = () => {
                        URL.revokeObjectURL(blobUrl);
                      };
                    } catch (error) {
                      console.error(`解密图片失败 (页 ${img.dataset.pageIndex}):`, error);
                      img.alt = `第${Number(img.dataset.pageIndex) + 1}页 - 解密失败`;
                      img.style.backgroundColor = "#ffebee";
                    }
                  }
                }
              }
            },
            {
              rootMargin: "200px"
            }
          );
          comicObserver = observer2;
          imgs.forEach((img) => observer2.observe(img));
        }
      } else {
        const imgs = [];
        for (let i2 = 0; i2 < chapter.content.picInfos.length; i2++) {
          const picInfo = chapter.content.picInfos[i2];
          const img = document.createElement("img");
          img.className = "fqa-comic-img";
          img.alt = `第${i2 + 1}页`;
          img.src = picInfo.picUrl;
          imgs.push(img);
        }
        const readerContainer = document.querySelector("div.muye-reader-content:not(.fqa)");
        if (readerContainer) {
          const scriptContainer = ensureScriptContainer(readerContainer, true);
          imgs.forEach((img) => scriptContainer.appendChild(img));
        }
      }
    }
    const muyeReaderTitle = document.querySelector("h1.muye-reader-title");
    let muyeReaderSubtitle = document.querySelector("div.muye-reader-subtitle");
    (_i = document.querySelector("#fqa-subtitle")) == null ? void 0 : _i.remove();
    if (muyeReaderSubtitle) {
      let _cloned = cloneElement(muyeReaderSubtitle);
      muyeReaderSubtitle.classList.add("fqa-hide");
      _cloned.id = "fqa-subtitle";
      muyeReaderSubtitle.insertAdjacentElement("afterend", _cloned);
      muyeReaderSubtitle = _cloned;
      _cloned.classList.remove("fqa-hide");
      console.log("clone subtitle: ", _cloned);
    }
    if (muyeReaderTitle) {
      muyeReaderTitle.textContent = chapterTitle;
    }
    console.log("Current book:", currentBook);
    if (!currentBook || currentBook == null || currentBook.book_id !== ((_j = chapter.novel_data) == null ? void 0 : _j.book_id)) {
      currentBook = await getBookInfoAndCatalog((_k = chapter.novel_data) == null ? void 0 : _k.book_id);
      console.log("Current book:", currentBook);
    }
    if (currentBook && currentBook.chapter_list) {
      const currentChapterItem = currentBook.chapter_list.find((c) => c.item_id === itemId2);
      if (currentChapterItem) {
        console.log("Current chapter:", currentChapterItem);
        document.title = currentChapterItem.title + " - " + currentBook.title + " - 番茄小说";
        if (document.getElementById("fqa-current-chapter-volume")) {
          const c = document.getElementById("fqa-current-chapter-volume");
          if (c) {
            c.textContent = currentChapterItem.volume_title;
          }
        } else {
          const volSpan = document.createElement("span");
          volSpan.className = "desc-item";
          volSpan.id = "fqa-current-chapter-volume";
          volSpan.textContent = currentChapterItem.volume_title;
          const c = muyeReaderSubtitle == null ? void 0 : muyeReaderSubtitle.firstChild;
          if (c) {
            c.insertAdjacentElement("beforebegin", volSpan);
          }
        }
        let updateTimeSpans = (muyeReaderSubtitle == null ? void 0 : muyeReaderSubtitle.querySelectorAll("span.desc-item")) || [];
        console.log("spans len", updateTimeSpans.length, "assertIsOffshelf", updateTimeSpans.length < 3);
        if (updateTimeSpans.length >= 3) {
          console.log("if");
          let updateTimeSpan = updateTimeSpans[updateTimeSpans.length - 1];
          let uttspan = updateTimeSpan.firstChild;
          uttspan == null ? void 0 : uttspan.remove();
          updateTimeSpan.innerHTML = "更新时间：" + currentChapterItem.update_time;
        } else {
          console.log("else");
          (_l = updateTimeSpans[updateTimeSpans.length - 1]) == null ? void 0 : _l.remove();
          const updateTimeSpan = document.createElement("span");
          updateTimeSpan.className = "desc-item";
          updateTimeSpan.textContent = `更新时间：${currentChapterItem.update_time}`;
          console.log("assert equal", currentChapterItem.item_id === ((_m = currentChapterWithContent == null ? void 0 : currentChapterWithContent.novel_data) == null ? void 0 : _m.item_id));
          console.log("wordcnt", (_n = currentChapterWithContent == null ? void 0 : currentChapterWithContent.novel_data) == null ? void 0 : _n.chapter_word_number);
          const c = document.getElementById("fqa-current-chapter-volume");
          let b = null;
          if (currentChapterItem.item_id === ((_o = currentChapterWithContent == null ? void 0 : currentChapterWithContent.novel_data) == null ? void 0 : _o.item_id)) {
            const wordCntSpan = document.createElement("span");
            wordCntSpan.className = "desc-item";
            wordCntSpan.textContent = `本章字数：${(_p = currentChapterWithContent == null ? void 0 : currentChapterWithContent.novel_data) == null ? void 0 : _p.chapter_word_number}字`;
            console.log(wordCntSpan);
            if (c) {
              console.log("insert wordcnt");
              c.insertAdjacentElement("afterend", wordCntSpan);
            }
            b = wordCntSpan;
          }
          console.log("insert update time");
          (_q = b || c) == null ? void 0 : _q.insertAdjacentElement("afterend", updateTimeSpan);
        }
      }
    }
    if (state.open) {
      await switchChapter(itemId2, {
        cover: (currentBook == null ? void 0 : currentBook.cover_url) ?? "",
        title: (currentBook == null ? void 0 : currentBook.title) ?? document.title
      });
    } else {
      refreshParagraphs();
    }
  }
  async function startAudioPlay() {
    var _a;
    if (state.open) {
      closeAudiobook();
      return;
    }
    const itemId2 = ((_a = window.location.pathname.split("/").pop()) == null ? void 0 : _a.substring(0, 19)) || "";
    if (!itemId2) return;
    initAudioPanel();
    await openAudiobook(itemId2, (currentBook == null ? void 0 : currentBook.book_id) ?? "", {
      cover: (currentBook == null ? void 0 : currentBook.cover_url) ?? "",
      title: (currentBook == null ? void 0 : currentBook.title) ?? document.title
    });
  }
  async function ensureAudiobookButton() {
    var _a;
    for (let attempt = 0; attempt < 40; attempt++) {
      const toolbar = document.querySelector(".reader-toolbar");
      if (toolbar) {
        const existing = document.getElementById("fqa-toggle-audiobook");
        if (existing && toolbar.contains(existing)) return;
        const items = Array.from(toolbar.querySelectorAll(".reader-toolbar-item"));
        const template = items[2] ?? items[0];
        if (template) {
          const c = cloneElement(template);
          c.id = "fqa-toggle-audiobook";
          c.classList.remove("reader-toolbar-item-disabled");
          const listenIcon = document.createElement("span");
          listenIcon.textContent = "听";
          listenIcon.style.width = "24px";
          listenIcon.style.height = "24px";
          listenIcon.style.fontSize = "24px";
          listenIcon.style.lineHeight = "24px";
          listenIcon.classList.add("muyeicon-icon");
          listenIcon.classList.add("reader-toolbar-item-icon");
          (_a = c.firstChild) == null ? void 0 : _a.replaceWith(listenIcon);
          const l = c.lastChild;
          if (l) {
            l.textContent = "听书";
          }
          c.addEventListener("click", () => void startAudioPlay());
          const last = items[items.length - 1] ?? template;
          last.insertAdjacentElement("afterend", c);
          return;
        }
      }
      await sleep(200);
    }
    console.warn("[fqa:reader] 未找到阅读器工具栏，听书按钮未注入");
  }
  async function onUrlChange$1(_previous) {
    await insertContent();
  }
  async function onHashChange$1(_previous) {
  }
  async function onLoad$1() {
    async function fetchBookInfo() {
      var _a, _b;
      const pageState = unsafeWindow.__INITIAL_STATE__;
      const bid = (_b = (_a = pageState == null ? void 0 : pageState.reader) == null ? void 0 : _a.chapterData) == null ? void 0 : _b.bookId;
      currentBook = await getBookInfoAndCatalog(bid);
    }
    void fetchBookInfo();
    void ensureAudiobookButton();
    const bookshelfButton = document.querySelector("div.reader-toolbar-item");
    if (userState.isLogin && bookshelfButton && bookshelfButton.innerHTML.includes("书架")) {
      const shelf = cloneElement(bookshelfButton);
      bookshelfButton.replaceWith(shelf);
      let inShelf = false;
      let ready = false;
      let busy = false;
      async function ensureBookshelfState() {
        while (!currentBook) {
          await sleep(50);
        }
        inShelf = await isInBookshelf(currentBook.book_id);
        shelf.classList.toggle("reader-toolbar-item-disabled", inShelf);
        const label = shelf.lastChild;
        if (label) label.textContent = inShelf ? "已在书架" : "加入书架";
        ready = true;
      }
      void ensureBookshelfState();
      shelf.addEventListener("click", async () => {
        const book = currentBook;
        if (!ready || busy || !book) return;
        busy = true;
        try {
          if (inShelf) {
            if (settings$1.shelfRemoveConfirm) {
              if (!unsafeWindow.confirm(`确定要把《${book.title ?? "这本书"}》从书架移出吗？`)) return;
            }
            await removeFromBookshelf(book.book_id);
          } else {
            await addToBookshelf(book.book_id);
          }
          await ensureBookshelfState();
        } catch (error) {
          console.error("[fqa:reader] 书架操作失败:", error);
          unsafeWindow.alert(error instanceof Error ? error.message : "书架操作失败");
        } finally {
          busy = false;
        }
      });
    }
    document.querySelector("div.muye-reader-btns");
    initParaCommentToggle();
    await insertContent();
  }
  function readerFilter(path, _query, _hash) {
    return path.startsWith("/reader") || path.startsWith("reader");
  }
  const _exports$4 = [
    {
      id: "readerHook_load",
      event: "load",
      handler: onLoad$1,
      filter: readerFilter
    },
    {
      id: "readerHook_urlChange",
      event: "onUrlChange",
      handler: onUrlChange$1,
      filter: readerFilter
    },
    {
      id: "readerHook_hashChange",
      event: "onHashChange",
      handler: onHashChange$1,
      filter: readerFilter
    }
  ];
  const bookshelf = '<svg xmlns="http://www.w3.org/2000/svg"\r\n     width="24"\r\n     height="24"\r\n     viewBox="0 0 24 24"\r\n     fill="none"\r\n     stroke="currentColor"\r\n     stroke-width="1.2"\r\n     stroke-linecap="round"\r\n     stroke-linejoin="round">\r\n  <path d="M3.5 20h17"/>\r\n  <rect x="5" y="7" width="3.5" height="13" rx="0.8"/>\r\n  <rect x="8.5" y="5" width="4" height="15" rx="0.8"/>\r\n  <path d="M15.1 6.2 18 5.5l3.1 13.6-2.9.7z"/>\r\n  <path d="M9.8 8h1.4M6.1 10h1.3M17 8.8l1.3-.3"/>\r\n</svg>';
  const settings = '<?xml version="1.0" encoding="utf-8"?>\r\n<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\r\n    <path fill-rule="evenodd" clip-rule="evenodd"\r\n        d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"\r\n        fill="currentColor" />\r\n    <path fill-rule="evenodd" clip-rule="evenodd"\r\n        d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z"\r\n        fill="currentColor" />\r\n</svg>';
  const name = "fanqie-assistant";
  const version = "0.0.7";
  const _hoisted_1$9 = {
    class: "fqa-set-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "助手设置"
  };
  const _hoisted_2$9 = { class: "fqa-set-side" };
  const _hoisted_3$9 = ["onClick", "onKeydown"];
  const _hoisted_4$8 = { class: "fqa-set-main" };
  const _hoisted_5$8 = { class: "fqa-set-row" };
  const _hoisted_6$8 = { class: "fqa-set-row" };
  const _hoisted_7$6 = { class: "fqa-set-row" };
  const _hoisted_8$6 = { class: "fqa-set-row" };
  const _hoisted_9$6 = { class: "fqa-set-row" };
  const _hoisted_10$6 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_11$5 = { class: "fqa-set-row" };
  const _hoisted_12$5 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_13$4 = ["disabled"];
  const _hoisted_14$4 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_15$2 = { class: "fqa-set-radios" };
  const _hoisted_16$1 = { class: "fqa-set-radio" };
  const _hoisted_17$1 = { class: "fqa-set-radio" };
  const _hoisted_18$1 = { class: "fqa-set-row" };
  const _hoisted_19$1 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_20 = {
    class: "fqa-set-row",
    style: { "padding-top": "0", "border-bottom": "none" }
  };
  const _hoisted_21 = { class: "fqa-set-row" };
  const _hoisted_22 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_23 = { class: "fqa-set-radios" };
  const _hoisted_24 = { class: "fqa-set-radio" };
  const _hoisted_25 = { class: "fqa-set-radio" };
  const _hoisted_26 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_27 = { class: "fqa-set-radios" };
  const _hoisted_28 = { class: "fqa-set-radio" };
  const _hoisted_29 = { class: "fqa-set-radio" };
  const _hoisted_30 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_31 = {
    class: "fqa-set-row",
    style: { "padding-top": "0", "border-bottom": "none" }
  };
  const _hoisted_32 = {
    class: "fqa-set-row",
    style: { "padding-top": "0", "border-bottom": "none" }
  };
  const _hoisted_33 = {
    class: "fqa-set-row",
    style: { "padding-top": "0", "border-bottom": "none" }
  };
  const _hoisted_34 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_35 = { class: "fqa-set-field" };
  const _hoisted_36 = { class: "fqa-set-field" };
  const _hoisted_37 = { class: "fqa-set-field" };
  const _hoisted_38 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_39 = { class: "fqa-set-radios" };
  const _hoisted_40 = { class: "fqa-set-radio" };
  const _hoisted_41 = { class: "fqa-set-radio" };
  const _hoisted_42 = { class: "fqa-set-row" };
  const _hoisted_43 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_44 = { class: "fqa-set-radios" };
  const _hoisted_45 = { class: "fqa-set-radio" };
  const _hoisted_46 = { class: "fqa-set-radio" };
  const _hoisted_47 = { class: "fqa-set-row fqa-set-row-col" };
  const _hoisted_48 = { class: "fqa-set-field" };
  const _hoisted_49 = ["placeholder"];
  const _hoisted_50 = { class: "fqa-set-field" };
  const _hoisted_51 = ["placeholder"];
  const _hoisted_52 = { class: "fqa-set-field" };
  const _hoisted_53 = ["placeholder"];
  const _hoisted_54 = { class: "fqa-set-actions" };
  const _hoisted_55 = ["disabled"];
  const _hoisted_56 = {
    key: 0,
    class: "fqa-set-note"
  };
  const _hoisted_57 = { class: "fqa-set-note" };
  const _hoisted_58 = { class: "fqa-set-links" };
  const _hoisted_59 = { class: "fqa-set-link-row" };
  const _hoisted_60 = ["href"];
  const GREASYFORK = "https://greasyfork.org/zh-CN/scripts/589115-%E7%95%AA%E8%8C%84%E5%B0%8F%E8%AF%B4%E5%8A%A9%E6%89%8B";
  const GITHUB = "https://github.com/naiyQAQ/fanqie-assistant";
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "SettingsView",
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      function resetDownloadTuning() {
        settings$1.downloadBatchSize = DEFAULT_SETTINGS.downloadBatchSize;
        settings$1.downloadInterval = DEFAULT_SETTINGS.downloadInterval;
        settings$1.downloadRetries = DEFAULT_SETTINGS.downloadRetries;
        flushSettings();
      }
      const SECTIONS = [
        { key: "general", label: "常规" },
        { key: "ui", label: "界面" },
        { key: "search", label: "搜索" },
        { key: "download", label: "下载" },
        { key: "audiobook", label: "听书" },
        { key: "protocol", label: "协议" },
        { key: "about", label: "关于" }
      ];
      const active = vue.ref("general");
      const registering = vue.ref(false);
      const registerMsg = vue.ref(null);
      async function reRegister() {
        if (registering.value) return;
        registering.value = true;
        registerMsg.value = "正在注册新设备…";
        try {
          const c = await provisionDevice();
          settings$1.deviceId = "";
          settings$1.installId = "";
          settings$1.deviceType = "";
          flushSettings();
          registerMsg.value = `注册成功：${c.device_id}`;
        } catch (err) {
          console.error("[fqa:settings] 设备注册失败:", err);
          registerMsg.value = err instanceof Error ? `注册失败：${err.message}` : "注册失败";
        } finally {
          registering.value = false;
        }
      }
      const currentDevice = vue.computed(() => ({
        device_id: settings$1.deviceId || _config.currentConfig.device_id,
        install_id: settings$1.installId || _config.currentConfig.install_id,
        device_type: settings$1.deviceType || _config.currentConfig.device_type || ""
      }));
      function close2() {
        flushSettings();
        emit("close");
      }
      function onKey(e) {
        if (e.key === "Escape") close2();
      }
      vue.onMounted(() => document.addEventListener("keydown", onKey));
      vue.onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
      const FEEDBACK = `${GREASYFORK}/feedback`;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "fqa-set-mask",
          onClick: vue.withModifiers(close2, ["self"])
        }, [
          vue.createElementVNode("div", _hoisted_1$9, [
            vue.createElementVNode("button", {
              class: "fqa-set-close",
              "aria-label": "关闭",
              onClick: close2
            }, "✕"),
            vue.createElementVNode("nav", _hoisted_2$9, [
              _cache[31] || (_cache[31] = vue.createElementVNode("div", { class: "fqa-set-side-title" }, "助手设置", -1)),
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(SECTIONS, (s) => {
                return vue.createElementVNode("div", {
                  key: s.key,
                  class: vue.normalizeClass(["fqa-set-nav", { "fqa-set-nav-active": active.value === s.key }]),
                  role: "button",
                  tabindex: "0",
                  onClick: ($event) => active.value = s.key,
                  onKeydown: vue.withKeys(vue.withModifiers(($event) => active.value = s.key, ["prevent"]), ["enter"])
                }, vue.toDisplayString(s.label), 43, _hoisted_3$9);
              }), 64))
            ]),
            vue.createElementVNode("section", _hoisted_4$8, [
              active.value === "general" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                _cache[37] || (_cache[37] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "常规", -1)),
                vue.createElementVNode("label", _hoisted_5$8, [
                  _cache[32] || (_cache[32] = vue.createElementVNode("span", { class: "fqa-set-label" }, "解密网页端混淆字体", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings$1).decryptFont = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).decryptFont]
                  ])
                ]),
                vue.createElementVNode("label", _hoisted_6$8, [
                  _cache[33] || (_cache[33] = vue.createElementVNode("span", { class: "fqa-set-label" }, "拦截网页事件上报", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(settings$1).blockReport = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).blockReport]
                  ])
                ]),
                vue.createElementVNode("label", _hoisted_7$6, [
                  _cache[34] || (_cache[34] = vue.createElementVNode("span", { class: "fqa-set-label" }, "允许阅读器复制文本", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(settings$1).allowCopy = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).allowCopy]
                  ])
                ]),
                vue.createElementVNode("label", _hoisted_8$6, [
                  _cache[35] || (_cache[35] = vue.createElementVNode("span", { class: "fqa-set-label" }, "移出书架时二次确认", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(settings$1).shelfRemoveConfirm = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).shelfRemoveConfirm]
                  ])
                ]),
                vue.createElementVNode("label", _hoisted_9$6, [
                  _cache[36] || (_cache[36] = vue.createElementVNode("span", { class: "fqa-set-label" }, "退出登录时二次确认", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(settings$1).logoutConfirm = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).logoutConfirm]
                  ])
                ])
              ], 64)) : active.value === "ui" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                _cache[46] || (_cache[46] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "界面", -1)),
                vue.createElementVNode("div", _hoisted_10$6, [
                  _cache[38] || (_cache[38] = vue.createElementVNode("span", { class: "fqa-set-label" }, "阅读器字体", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(settings$1).readerFont = $event),
                    class: "fqa-set-input",
                    type: "text",
                    placeholder: "留空表示使用默认字体"
                  }, null, 512), [
                    [vue.vModelText, vue.unref(settings$1).readerFont]
                  ]),
                  _cache[39] || (_cache[39] = vue.createElementVNode("p", { class: "fqa-set-note" }, "填写字体名称，例如「思源宋体」。留空则跟随网页默认。", -1))
                ]),
                vue.createElementVNode("div", _hoisted_11$5, [
                  _cache[40] || (_cache[40] = vue.createElementVNode("span", { class: "fqa-set-label" }, "自定义 CSS", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(settings$1).customCssEnabled = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).customCssEnabled]
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_12$5, [
                  vue.withDirectives(vue.createElementVNode("textarea", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(settings$1).customCss = $event),
                    class: "fqa-set-textarea",
                    disabled: !vue.unref(settings$1).customCssEnabled,
                    spellcheck: "false",
                    placeholder: "/* 自定义 CSS */"
                  }, null, 8, _hoisted_13$4), [
                    [vue.vModelText, vue.unref(settings$1).customCss]
                  ]),
                  _cache[41] || (_cache[41] = vue.createElementVNode("p", { class: "fqa-set-note" }, "关闭开关后内容会保留，只是不再应用。", -1))
                ]),
                vue.createElementVNode("div", _hoisted_14$4, [
                  _cache[44] || (_cache[44] = vue.createElementVNode("span", { class: "fqa-set-label" }, "书架单击书本", -1)),
                  vue.createElementVNode("div", _hoisted_15$2, [
                    vue.createElementVNode("label", _hoisted_16$1, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(settings$1).bookshelfClickAction = $event),
                        type: "radio",
                        value: "read"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).bookshelfClickAction]
                      ]),
                      _cache[42] || (_cache[42] = vue.createElementVNode("span", null, "继续阅读", -1))
                    ]),
                    vue.createElementVNode("label", _hoisted_17$1, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.unref(settings$1).bookshelfClickAction = $event),
                        type: "radio",
                        value: "detail"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).bookshelfClickAction]
                      ]),
                      _cache[43] || (_cache[43] = vue.createElementVNode("span", null, "查看详情", -1))
                    ])
                  ]),
                  _cache[45] || (_cache[45] = vue.createElementVNode("p", { class: "fqa-set-note" }, " 按住 Ctrl 单击去往另一项；中键在新标签页打开，Ctrl+中键同样反向。 选「继续阅读」但这本书还没读过时，会退回详情页。 ", -1))
                ])
              ], 64)) : active.value === "search" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                _cache[50] || (_cache[50] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "搜索", -1)),
                vue.createElementVNode("label", _hoisted_18$1, [
                  _cache[47] || (_cache[47] = vue.createElementVNode("span", { class: "fqa-set-label" }, "接管搜索界面", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(settings$1).enhanceSearch = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).enhanceSearch]
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_19$1, [
                  vue.createElementVNode("label", _hoisted_20, [
                    _cache[48] || (_cache[48] = vue.createElementVNode("span", { class: "fqa-set-label" }, "个人化推荐", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.unref(settings$1).searchPersonalized = $event),
                      type: "checkbox",
                      class: "fqa-set-switch"
                    }, null, 512), [
                      [vue.vModelCheckbox, vue.unref(settings$1).searchPersonalized]
                    ])
                  ]),
                  _cache[49] || (_cache[49] = vue.createElementVNode("p", { class: "fqa-set-note" }, " 开启后搜索走同源请求，由浏览器自动带上你的登录 Cookie，番茄据此按阅读偏好排序。 凭据不经过脚本，也不会发往番茄以外的任何地方。关闭时走匿名请求。 ", -1))
                ])
              ], 64)) : active.value === "download" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                _cache[71] || (_cache[71] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "下载", -1)),
                vue.createElementVNode("label", _hoisted_21, [
                  _cache[51] || (_cache[51] = vue.createElementVNode("span", { class: "fqa-set-label" }, "显示下载入口", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(settings$1).enableDownload = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).enableDownload]
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_22, [
                  _cache[54] || (_cache[54] = vue.createElementVNode("span", { class: "fqa-set-label" }, "默认格式", -1)),
                  vue.createElementVNode("div", _hoisted_23, [
                    vue.createElementVNode("label", _hoisted_24, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(settings$1).downloadFormat = $event),
                        type: "radio",
                        value: "epub"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).downloadFormat]
                      ]),
                      _cache[52] || (_cache[52] = vue.createElementVNode("span", null, "EPUB", -1))
                    ]),
                    vue.createElementVNode("label", _hoisted_25, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(settings$1).downloadFormat = $event),
                        type: "radio",
                        value: "txt"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).downloadFormat]
                      ]),
                      _cache[53] || (_cache[53] = vue.createElementVNode("span", null, "TXT", -1))
                    ])
                  ]),
                  _cache[55] || (_cache[55] = vue.createElementVNode("p", { class: "fqa-set-note" }, " EPUB 保留原始排版、插图与分卷目录；TXT 是纯文本。右键菜单里可以单次指定格式。 ", -1))
                ]),
                vue.createElementVNode("div", _hoisted_26, [
                  _cache[58] || (_cache[58] = vue.createElementVNode("span", { class: "fqa-set-label" }, "TXT 编码", -1)),
                  vue.createElementVNode("div", _hoisted_27, [
                    vue.createElementVNode("label", _hoisted_28, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => vue.unref(settings$1).downloadCharset = $event),
                        type: "radio",
                        value: "utf-8"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).downloadCharset]
                      ]),
                      _cache[56] || (_cache[56] = vue.createElementVNode("span", null, "UTF-8", -1))
                    ]),
                    vue.createElementVNode("label", _hoisted_29, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => vue.unref(settings$1).downloadCharset = $event),
                        type: "radio",
                        value: "gbk"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).downloadCharset]
                      ]),
                      _cache[57] || (_cache[57] = vue.createElementVNode("span", null, "GBK", -1))
                    ])
                  ]),
                  _cache[59] || (_cache[59] = vue.createElementVNode("p", { class: "fqa-set-note" }, "EPUB 固定使用 UTF-8。老设备或部分阅读器可能需要 GBK。", -1))
                ]),
                vue.createElementVNode("div", _hoisted_30, [
                  _cache[63] || (_cache[63] = vue.createElementVNode("span", { class: "fqa-set-label" }, "EPUB 选项", -1)),
                  vue.createElementVNode("label", _hoisted_31, [
                    _cache[60] || (_cache[60] = vue.createElementVNode("span", { class: "fqa-set-label" }, "下载正文插图", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => vue.unref(settings$1).downloadImages = $event),
                      type: "checkbox",
                      class: "fqa-set-switch"
                    }, null, 512), [
                      [vue.vModelCheckbox, vue.unref(settings$1).downloadImages]
                    ])
                  ]),
                  vue.createElementVNode("label", _hoisted_32, [
                    _cache[61] || (_cache[61] = vue.createElementVNode("span", { class: "fqa-set-label" }, "保留书籍排版样式", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => vue.unref(settings$1).downloadBookCss = $event),
                      type: "checkbox",
                      class: "fqa-set-switch"
                    }, null, 512), [
                      [vue.vModelCheckbox, vue.unref(settings$1).downloadBookCss]
                    ])
                  ]),
                  vue.createElementVNode("label", _hoisted_33, [
                    _cache[62] || (_cache[62] = vue.createElementVNode("span", { class: "fqa-set-label" }, "为每卷生成卷页", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => vue.unref(settings$1).downloadVolumePage = $event),
                      type: "checkbox",
                      class: "fqa-set-switch"
                    }, null, 512), [
                      [vue.vModelCheckbox, vue.unref(settings$1).downloadVolumePage]
                    ])
                  ]),
                  _cache[64] || (_cache[64] = vue.createElementVNode("p", { class: "fqa-set-note" }, " 插图逐张下载，图多的书会明显变慢、文件也更大；关闭后正文里仍保留图片地址，联网可看。 ", -1))
                ]),
                vue.createElementVNode("div", _hoisted_34, [
                  _cache[68] || (_cache[68] = vue.createElementVNode("span", { class: "fqa-set-label" }, "请求节奏", -1)),
                  _cache[69] || (_cache[69] = vue.createElementVNode("p", { class: "fqa-set-warn" }, " 接口对批量正文有限制，调得太激进会导致大量章节抓不到甚至触发风控。不清楚就别改。 ", -1)),
                  vue.createElementVNode("label", _hoisted_35, [
                    _cache[65] || (_cache[65] = vue.createElementVNode("span", null, "每批章节数（1-30）", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => vue.unref(settings$1).downloadBatchSize = $event),
                      class: "fqa-set-input",
                      type: "number",
                      min: "1",
                      max: "30"
                    }, null, 512), [
                      [
                        vue.vModelText,
                        vue.unref(settings$1).downloadBatchSize,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  vue.createElementVNode("label", _hoisted_36, [
                    _cache[66] || (_cache[66] = vue.createElementVNode("span", null, "批次间隔 (ms)", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => vue.unref(settings$1).downloadInterval = $event),
                      class: "fqa-set-input",
                      type: "number",
                      min: "0",
                      max: "10000",
                      step: "50"
                    }, null, 512), [
                      [
                        vue.vModelText,
                        vue.unref(settings$1).downloadInterval,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  vue.createElementVNode("label", _hoisted_37, [
                    _cache[67] || (_cache[67] = vue.createElementVNode("span", null, "重试轮数", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => vue.unref(settings$1).downloadRetries = $event),
                      class: "fqa-set-input",
                      type: "number",
                      min: "0",
                      max: "10"
                    }, null, 512), [
                      [
                        vue.vModelText,
                        vue.unref(settings$1).downloadRetries,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  _cache[70] || (_cache[70] = vue.createElementVNode("p", { class: "fqa-set-note" }, " 实测单次请求最多返回 30 章正文，间隔小于约 750ms 会被限流成每次 1 章。 ", -1)),
                  vue.createElementVNode("div", { class: "fqa-set-actions" }, [
                    vue.createElementVNode("button", {
                      class: "fqa-set-btn",
                      onClick: resetDownloadTuning
                    }, "恢复推荐值")
                  ])
                ])
              ], 64)) : active.value === "audiobook" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
                _cache[77] || (_cache[77] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "听书", -1)),
                vue.createElementVNode("div", _hoisted_38, [
                  _cache[74] || (_cache[74] = vue.createElementVNode("span", { class: "fqa-set-label" }, "读完一章后", -1)),
                  vue.createElementVNode("div", _hoisted_39, [
                    vue.createElementVNode("label", _hoisted_40, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => vue.unref(settings$1).audiobookChapterEnd = $event),
                        type: "radio",
                        value: "next"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).audiobookChapterEnd]
                      ]),
                      _cache[72] || (_cache[72] = vue.createElementVNode("span", null, "自动下一章", -1))
                    ]),
                    vue.createElementVNode("label", _hoisted_41, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => vue.unref(settings$1).audiobookChapterEnd = $event),
                        type: "radio",
                        value: "stop"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).audiobookChapterEnd]
                      ]),
                      _cache[73] || (_cache[73] = vue.createElementVNode("span", null, "停止播放", -1))
                    ])
                  ]),
                  _cache[75] || (_cache[75] = vue.createElementVNode("p", { class: "fqa-set-note" }, " 自动下一章会点击页面上的「下一章」，读到全书最后一章时自动停下。 ", -1))
                ]),
                vue.createElementVNode("label", _hoisted_42, [
                  _cache[76] || (_cache[76] = vue.createElementVNode("span", { class: "fqa-set-label" }, "高亮并跟随朗读段落", -1)),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => vue.unref(settings$1).audiobookFollow = $event),
                    type: "checkbox",
                    class: "fqa-set-switch"
                  }, null, 512), [
                    [vue.vModelCheckbox, vue.unref(settings$1).audiobookFollow]
                  ])
                ]),
                _cache[78] || (_cache[78] = vue.createElementVNode("p", { class: "fqa-set-note" }, " 关闭后仍会高亮当前段落，但不再自动滚动页面。点击任意段落可跳到该处朗读。 ", -1))
              ], 64)) : active.value === "protocol" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
                _cache[88] || (_cache[88] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "协议", -1)),
                vue.createElementVNode("div", _hoisted_43, [
                  _cache[81] || (_cache[81] = vue.createElementVNode("span", { class: "fqa-set-label" }, "API 偏好", -1)),
                  vue.createElementVNode("div", _hoisted_44, [
                    vue.createElementVNode("label", _hoisted_45, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => vue.unref(settings$1).apiPreference = $event),
                        type: "radio",
                        value: "app"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).apiPreference]
                      ]),
                      _cache[79] || (_cache[79] = vue.createElementVNode("span", null, "番茄 APP", -1))
                    ]),
                    vue.createElementVNode("label", _hoisted_46, [
                      vue.withDirectives(vue.createElementVNode("input", {
                        "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => vue.unref(settings$1).apiPreference = $event),
                        type: "radio",
                        value: "redcandle"
                      }, null, 512), [
                        [vue.vModelRadio, vue.unref(settings$1).apiPreference]
                      ]),
                      _cache[80] || (_cache[80] = vue.createElementVNode("span", null, "红烛 APP", -1))
                    ])
                  ]),
                  _cache[82] || (_cache[82] = vue.createElementVNode("p", { class: "fqa-set-note" }, "如果某协议数据不全，脚本可能会选择其他接口作为补充。", -1))
                ]),
                vue.createElementVNode("div", _hoisted_47, [
                  _cache[86] || (_cache[86] = vue.createElementVNode("span", { class: "fqa-set-label" }, "设备信息", -1)),
                  _cache[87] || (_cache[87] = vue.createElementVNode("p", { class: "fqa-set-warn" }, " 如果不知道这是什么，请保持默认。乱填可能导致脚本功能异常。 ", -1)),
                  vue.createElementVNode("label", _hoisted_48, [
                    _cache[83] || (_cache[83] = vue.createElementVNode("span", null, "device_id", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => vue.unref(settings$1).deviceId = $event),
                      class: "fqa-set-input",
                      type: "text",
                      placeholder: currentDevice.value.device_id || "自动注册"
                    }, null, 8, _hoisted_49), [
                      [vue.vModelText, vue.unref(settings$1).deviceId]
                    ])
                  ]),
                  vue.createElementVNode("label", _hoisted_50, [
                    _cache[84] || (_cache[84] = vue.createElementVNode("span", null, "install_id (iid)", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => vue.unref(settings$1).installId = $event),
                      class: "fqa-set-input",
                      type: "text",
                      placeholder: currentDevice.value.install_id || "自动注册"
                    }, null, 8, _hoisted_51), [
                      [vue.vModelText, vue.unref(settings$1).installId]
                    ])
                  ]),
                  vue.createElementVNode("label", _hoisted_52, [
                    _cache[85] || (_cache[85] = vue.createElementVNode("span", null, "device_type", -1)),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => vue.unref(settings$1).deviceType = $event),
                      class: "fqa-set-input",
                      type: "text",
                      placeholder: currentDevice.value.device_type || "自动注册"
                    }, null, 8, _hoisted_53), [
                      [vue.vModelText, vue.unref(settings$1).deviceType]
                    ])
                  ]),
                  vue.createElementVNode("div", _hoisted_54, [
                    vue.createElementVNode("button", {
                      class: "fqa-set-btn",
                      disabled: registering.value,
                      onClick: reRegister
                    }, vue.toDisplayString(registering.value ? "注册中…" : "重新注册"), 9, _hoisted_55),
                    registerMsg.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_56, vue.toDisplayString(registerMsg.value), 1)) : vue.createCommentVNode("", true)
                  ])
                ])
              ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 6 }, [
                _cache[93] || (_cache[93] = vue.createElementVNode("h3", { class: "fqa-set-h" }, "关于", -1)),
                vue.createElementVNode("p", _hoisted_57, "番茄小说助手 v" + vue.toDisplayString(vue.unref(version)), 1),
                vue.createElementVNode("div", _hoisted_58, [
                  vue.createElementVNode("div", { class: "fqa-set-link-row" }, [
                    _cache[89] || (_cache[89] = vue.createElementVNode("span", null, "GreasyFork 地址：", -1)),
                    vue.createElementVNode("a", {
                      href: GREASYFORK,
                      target: "_blank",
                      rel: "noreferrer noopener"
                    }, "跳转")
                  ]),
                  vue.createElementVNode("div", { class: "fqa-set-link-row" }, [
                    _cache[90] || (_cache[90] = vue.createElementVNode("span", null, "GitHub 地址：", -1)),
                    vue.createElementVNode("a", {
                      href: GITHUB,
                      target: "_blank",
                      rel: "noreferrer noopener"
                    }, "跳转")
                  ]),
                  vue.createElementVNode("div", _hoisted_59, [
                    _cache[92] || (_cache[92] = vue.createElementVNode("span", null, "问题反馈：", -1)),
                    vue.createElementVNode("a", {
                      href: FEEDBACK,
                      target: "_blank",
                      rel: "noreferrer noopener"
                    }, "GreasyFork"),
                    vue.createElementVNode("span", null, [
                      _cache[91] || (_cache[91] = vue.createTextVNode(" 或 ", -1)),
                      vue.createElementVNode("a", {
                        href: `${GITHUB}/issues`,
                        target: "_blank",
                        rel: "noreferrer noopener"
                      }, " GitHub Issues ", 8, _hoisted_60)
                    ])
                  ])
                ]),
                _cache[94] || (_cache[94] = vue.createElementVNode("div", { class: "fqa-set-license" }, [
                  vue.createElementVNode("p", null, " 本脚本基于 GNU General Public License 3.0 授权，完全开源且免费，修改/二次开发请注意遵守开源协议。 "),
                  vue.createElementVNode("p", null, "本脚本使用 TypeScript + Vue 开发，请避免直接修改编译产物。")
                ], -1))
              ], 64))
            ])
          ])
        ]);
      };
    }
  });
  const settingscss = "/* 助手设置面板 */\r\n\r\n.fqa-set-mask {\r\n    position: fixed;\r\n    inset: 0;\r\n    z-index: 2147483200;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    background: rgba(0, 0, 0, 0.45);\r\n    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial,\r\n        sans-serif;\r\n    font-size: 14px;\r\n    line-height: 1.6;\r\n    color: var(--fqa-set-text, #1f2329);\r\n}\r\n\r\n.fqa-set-dialog {\r\n    --fqa-set-bg: #fff;\r\n    --fqa-set-side-bg: #f7f8fa;\r\n    --fqa-set-text: #1f2329;\r\n    --fqa-set-sub: #8f959e;\r\n    --fqa-set-border: rgba(31, 35, 41, 0.1);\r\n    --fqa-set-accent: #ff6f3d;\r\n    --fqa-set-hover: rgba(31, 35, 41, 0.05);\r\n\r\n    position: relative;\r\n    display: flex;\r\n    width: min(760px, 92vw);\r\n    height: min(520px, 84vh);\r\n    background: var(--fqa-set-bg);\r\n    color: var(--fqa-set-text);\r\n    border-radius: 12px;\r\n    overflow: hidden;\r\n    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.24);\r\n}\r\n\r\n.fqa-set-close {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 12px;\r\n    width: 28px;\r\n    height: 28px;\r\n    padding: 0;\r\n    border: none;\r\n    border-radius: 6px;\r\n    background: transparent;\r\n    color: var(--fqa-set-sub);\r\n    font-size: 15px;\r\n    line-height: 1;\r\n    cursor: pointer;\r\n}\r\n\r\n.fqa-set-close:hover {\r\n    background: var(--fqa-set-hover);\r\n    color: var(--fqa-set-text);\r\n}\r\n\r\n/* 左侧栏 */\r\n.fqa-set-side {\r\n    flex: 0 0 148px;\r\n    padding: 16px 8px;\r\n    box-sizing: border-box;\r\n    background: var(--fqa-set-side-bg);\r\n    border-right: 1px solid var(--fqa-set-border);\r\n    overflow-y: auto;\r\n}\r\n\r\n.fqa-set-side-title {\r\n    padding: 0 10px 12px;\r\n    font-size: 15px;\r\n    font-weight: 600;\r\n}\r\n\r\n.fqa-set-nav {\r\n    padding: 8px 10px;\r\n    margin-bottom: 2px;\r\n    border-radius: 6px;\r\n    cursor: pointer;\r\n    user-select: none;\r\n}\r\n\r\n.fqa-set-nav:hover {\r\n    background: var(--fqa-set-hover);\r\n}\r\n\r\n.fqa-set-nav-active {\r\n    background: var(--fqa-set-hover);\r\n    color: var(--fqa-set-accent);\r\n    font-weight: 600;\r\n}\r\n\r\n/* 右侧内容 */\r\n.fqa-set-main {\r\n    flex: 1 1 auto;\r\n    padding: 20px 24px;\r\n    box-sizing: border-box;\r\n    overflow-y: auto;\r\n}\r\n\r\n.fqa-set-h {\r\n    margin: 0 0 14px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n}\r\n\r\n.fqa-set-row {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 16px;\r\n    padding: 10px 0;\r\n    border-bottom: 1px solid var(--fqa-set-border);\r\n}\r\n\r\n.fqa-set-row:last-child {\r\n    border-bottom: none;\r\n}\r\n\r\n.fqa-set-row-col {\r\n    display: block;\r\n}\r\n\r\n.fqa-set-label {\r\n    font-size: 14px;\r\n}\r\n\r\n.fqa-set-note {\r\n    margin: 6px 0 0;\r\n    font-size: 12px;\r\n    color: var(--fqa-set-sub);\r\n}\r\n\r\n.fqa-set-warn {\r\n    margin: 6px 0 10px;\r\n    padding: 8px 10px;\r\n    font-size: 12px;\r\n    color: #a8371f;\r\n    background: rgba(255, 111, 61, 0.1);\r\n    border-left: 3px solid var(--fqa-set-accent);\r\n    border-radius: 0 4px 4px 0;\r\n}\r\n\r\n/* 开关：用原生 checkbox 改造，避免额外依赖 */\r\n.fqa-set-switch {\r\n    appearance: none;\r\n    flex: 0 0 auto;\r\n    position: relative;\r\n    width: 38px;\r\n    height: 22px;\r\n    margin: 0;\r\n    border-radius: 11px;\r\n    background: rgba(31, 35, 41, 0.18);\r\n    cursor: pointer;\r\n    transition: background 0.18s ease;\r\n}\r\n\r\n.fqa-set-switch::after {\r\n    content: '';\r\n    position: absolute;\r\n    top: 2px;\r\n    left: 2px;\r\n    width: 18px;\r\n    height: 18px;\r\n    border-radius: 50%;\r\n    background: #fff;\r\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n    transition: transform 0.18s ease;\r\n}\r\n\r\n.fqa-set-switch:checked {\r\n    background: var(--fqa-set-accent);\r\n}\r\n\r\n.fqa-set-switch:checked::after {\r\n    transform: translateX(16px);\r\n}\r\n\r\n.fqa-set-input {\r\n    width: 100%;\r\n    margin-top: 8px;\r\n    padding: 7px 10px;\r\n    box-sizing: border-box;\r\n    border: 1px solid var(--fqa-set-border);\r\n    border-radius: 6px;\r\n    background: var(--fqa-set-bg);\r\n    color: var(--fqa-set-text);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n}\r\n\r\n.fqa-set-input:focus {\r\n    outline: none;\r\n    border-color: var(--fqa-set-accent);\r\n}\r\n\r\n.fqa-set-textarea {\r\n    width: 100%;\r\n    min-height: 150px;\r\n    margin-top: 10px;\r\n    padding: 10px;\r\n    box-sizing: border-box;\r\n    border: 1px solid var(--fqa-set-border);\r\n    border-radius: 6px;\r\n    background: var(--fqa-set-bg);\r\n    color: var(--fqa-set-text);\r\n    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\r\n    font-size: 12px;\r\n    line-height: 1.6;\r\n    resize: vertical;\r\n}\r\n\r\n.fqa-set-textarea:disabled {\r\n    background: var(--fqa-set-side-bg);\r\n    color: var(--fqa-set-sub);\r\n    cursor: not-allowed;\r\n}\r\n\r\n.fqa-set-textarea:focus {\r\n    outline: none;\r\n    border-color: var(--fqa-set-accent);\r\n}\r\n\r\n.fqa-set-radios {\r\n    display: flex;\r\n    gap: 20px;\r\n    margin-top: 8px;\r\n}\r\n\r\n.fqa-set-radio {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    cursor: pointer;\r\n}\r\n\r\n.fqa-set-radio input {\r\n    accent-color: var(--fqa-set-accent);\r\n}\r\n\r\n.fqa-set-field {\r\n    display: block;\r\n    margin-top: 10px;\r\n    font-size: 12px;\r\n    color: var(--fqa-set-sub);\r\n}\r\n\r\n.fqa-set-actions {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    margin-top: 14px;\r\n}\r\n\r\n.fqa-set-btn {\r\n    padding: 7px 16px;\r\n    border: 1px solid var(--fqa-set-border);\r\n    border-radius: 6px;\r\n    background: var(--fqa-set-bg);\r\n    color: var(--fqa-set-text);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    cursor: pointer;\r\n}\r\n\r\n.fqa-set-btn:hover:not(:disabled) {\r\n    border-color: var(--fqa-set-accent);\r\n    color: var(--fqa-set-accent);\r\n}\r\n\r\n.fqa-set-btn:disabled {\r\n    color: var(--fqa-set-sub);\r\n    cursor: not-allowed;\r\n}\r\n\r\n/* 关于 */\r\n.fqa-set-links {\r\n    margin-top: 12px;\r\n}\r\n\r\n.fqa-set-link-row {\r\n    margin-bottom: 10px;\r\n    font-size: 13px;\r\n    word-break: break-all;\r\n}\r\n\r\n.fqa-set-link-row a {\r\n    color: var(--fqa-set-accent);\r\n    text-decoration: none;\r\n}\r\n\r\n.fqa-set-link-row a:hover {\r\n    text-decoration: underline;\r\n}\r\n\r\n.fqa-set-license {\r\n    margin-top: 20px;\r\n    padding-top: 14px;\r\n    border-top: 1px solid var(--fqa-set-border);\r\n    font-size: 12px;\r\n    color: var(--fqa-set-sub);\r\n}\r\n\r\n.fqa-set-license p {\r\n    margin: 0 0 6px;\r\n}\r\n\r\n/* 深色 */\r\n@media (prefers-color-scheme: dark) {\r\n    .fqa-set-dialog {\r\n        --fqa-set-bg: #23272e;\r\n        --fqa-set-side-bg: #1c2026;\r\n        --fqa-set-text: #e5e6eb;\r\n        --fqa-set-sub: #8f959e;\r\n        --fqa-set-border: rgba(255, 255, 255, 0.12);\r\n        --fqa-set-hover: rgba(255, 255, 255, 0.08);\r\n    }\r\n\r\n    .fqa-set-switch {\r\n        background: rgba(255, 255, 255, 0.2);\r\n    }\r\n\r\n    .fqa-set-warn {\r\n        color: #ffb59b;\r\n    }\r\n}\r\n";
  const CONTAINER_ID$3 = "fqa-settings-root";
  const STYLE_ID$4 = "fqa-settings-style";
  let app$3 = null;
  let container$3 = null;
  function injectStyle$4() {
    if (document.getElementById(STYLE_ID$4)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID$4;
    style.textContent = settingscss;
    document.head.appendChild(style);
  }
  function closeSettings() {
    app$3 == null ? void 0 : app$3.unmount();
    app$3 = null;
    container$3 == null ? void 0 : container$3.remove();
    container$3 = null;
  }
  function openSettings() {
    if (app$3) return;
    injectStyle$4();
    container$3 = document.createElement("div");
    container$3.id = CONTAINER_ID$3;
    document.body.appendChild(container$3);
    app$3 = vue.createApp({
      render: () => vue.h(_sfc_main$9, { onClose: closeSettings })
    });
    app$3.config.errorHandler = (err, _instance, info) => {
      console.error(`[fqa:settings] Vue error (${info}):`, err);
    };
    app$3.mount(container$3);
  }
  function formatReadingTime(readBookTime) {
    let minutes = readBookTime / 60000n;
    const hours = minutes / 60n;
    minutes = minutes % 60n;
    return `${hours} 时 ${minutes} 分`;
  }
  function createMenuItem(text, icon, onclick) {
    const item = document.createElement("div");
    item.role = "menuitem";
    item.classList.add("fqa-menu-item", "arco-menu-item", "serial-menu-item", "slogin-user-avatar__menu-item-wrapper");
    const inner1 = document.createElement("div");
    inner1.classList.add("slogin-user-avatar__menu-item");
    if (icon) {
      const iconDiv = document.createElement("div");
      iconDiv.classList.add("slogin-user-avatar__menu-item__icon");
      if (document.querySelector("div.muye-reader-dark")) {
        console.log("isdark");
        iconDiv.classList.add("fqa-icon-dark");
      } else {
        console.log("islight");
      }
      iconDiv.innerHTML = icon;
      inner1.appendChild(iconDiv);
    }
    const inner2 = document.createElement("div");
    inner2.classList.add("slogin-user-avatar__menu-item__content");
    inner2.textContent = text;
    inner1.appendChild(inner2);
    item.appendChild(inner1);
    if (onclick) {
      item.addEventListener("click", onclick);
    }
    return item;
  }
  async function mainHook$3(_previous) {
    const userInfo = await getDetailedUserInfo();
    if (!userInfo) {
      return;
    }
    const injected = /* @__PURE__ */ new WeakSet();
    const inject2 = (menuInner) => {
      if (menuInner.querySelectorAll("div.arco-menu-inline").length > 0) {
        return;
      }
      if (injected.has(menuInner)) {
        return;
      }
      injected.add(menuInner);
      console.log("user action dialog created", menuInner);
      const firstDiv = createMenuItem(`阅读 ${userInfo.read_book_num} 本书`);
      menuInner.insertAdjacentElement("afterbegin", firstDiv);
      const secondDiv = createMenuItem(formatReadingTime(userInfo.read_book_time ?? 0n));
      firstDiv.insertAdjacentElement("afterend", secondDiv);
      const thirdDiv = createMenuItem("我的书架", bookshelf, () => {
        window.open("https://fanqienovel.com/bookshelf", "_blank");
      });
      secondDiv.insertAdjacentElement("afterend", thirdDiv);
      menuInner.appendChild(createMenuItem("助手设置", settings, openSettings));
      menuInner.childNodes.forEach((node) => {
        var _a, _b;
        if (((_b = (_a = node.lastChild) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) === "退出登录") {
          const original = node;
          const replaced = cloneElement(node);
          original.classList.add("fqa-hide");
          original.insertAdjacentElement("afterend", replaced);
          replaced.addEventListener("click", (_) => {
            if (!settings$1.logoutConfirm || unsafeWindow.confirm("确认退出登录吗?")) {
              original.click();
            }
          });
        }
      });
    };
    const scan = (root) => {
      if (root.classList.contains("arco-menu-inner")) {
        inject2(root);
      }
      root.querySelectorAll(".arco-menu-inner").forEach(inject2);
    };
    const observer2 = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              scan(node);
            }
          });
        }
      });
    });
    observer2.observe(document.body, { childList: true, subtree: true });
    scan(document.body);
  }
  async function guestHook(_previous) {
    const injected = /* @__PURE__ */ new WeakSet();
    const inject2 = (registerBtn) => {
      const parent = registerBtn.parentElement;
      if (!parent || injected.has(parent)) return;
      if (parent.querySelector(".fqa-settings-entry")) return;
      injected.add(parent);
      const entry = cloneElement(registerBtn);
      entry.classList.add("fqa-settings-entry");
      entry.textContent = "助手设置";
      entry.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openSettings();
      });
      registerBtn.insertAdjacentElement("afterend", entry);
    };
    const scan = (root) => {
      root.querySelectorAll(".slogin-user-avatar__buttons__item").forEach((el) => {
        var _a;
        if (el.classList.contains("fqa-settings-entry")) return;
        if (((_a = el.textContent) == null ? void 0 : _a.trim()) === "注册") inject2(el);
      });
    };
    const observer2 = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) scan(node);
        }
      }
    });
    observer2.observe(document.body, { childList: true, subtree: true });
    scan(document);
  }
  function filter$3(path, _query, _hash) {
    return userState.isLogin && !path.startsWith("/writer") && !path.startsWith("/welfare");
  }
  function guestFilter(path, _query, _hash) {
    return !userState.isLogin && !path.startsWith("/writer") && !path.startsWith("/welfare");
  }
  const _exports$3 = [
    {
      id: "userHook",
      event: "load",
      filter: filter$3,
      handler: mainHook$3
    },
    {
      id: "userHook_guest",
      event: "load",
      filter: guestFilter,
      handler: guestHook
    }
  ];
  const MIDDLE_BUTTON = 1;
  function modifiersOf(event) {
    return {
      flip: event.ctrlKey || event.metaKey,
      newTab: "button" in event && event.button === MIDDLE_BUTTON
    };
  }
  function isMiddleButton(event) {
    return event.button === MIDDLE_BUTTON;
  }
  function readerUrl(chapterId) {
    return `https://fanqienovel.com/reader/${chapterId}`;
  }
  function bookPageUrl(bookId2) {
    return `https://fanqienovel.com/page/${bookId2}`;
  }
  function openUrl(url, newTab = false) {
    if (!newTab) {
      unsafeWindow.location.href = url;
      return;
    }
    if (!unsafeWindow.open(url, "_blank")) {
      console.warn("[fqa:nav] 新标签页被拦截，请检查浏览器的弹窗设置:", url);
    }
  }
  const _hoisted_1$8 = ["aria-label", "onKeydown"];
  const _hoisted_2$8 = { class: "fqa-cover" };
  const _hoisted_3$8 = ["src", "alt"];
  const _hoisted_4$7 = {
    key: 1,
    class: "fqa-cover-progress"
  };
  const _hoisted_5$7 = ["title"];
  const _hoisted_6$7 = ["title"];
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookCard",
    props: {
      entry: {}
    },
    emits: ["hover", "leave", "open", "visible", "contextmenu"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const detail = vue.computed(() => props.entry.detail);
      const title = vue.computed(() => {
        var _a;
        return ((_a = detail.value) == null ? void 0 : _a.title) ?? "";
      });
      const tag = vue.computed(() => {
        const d = detail.value;
        if (!d) return null;
        if (d.update_status === "1") return { text: "更新", cls: "" };
        if (d.status === "4") return { text: "断更", cls: "fqa-cover-tag-gray" };
        if (d.status === "0") return { text: "完结", cls: "fqa-cover-tag-gray" };
        if (d.status === "1") return { text: "连载", cls: "fqa-cover-tag-gray" };
        return null;
      });
      const progressText = vue.computed(() => {
        const d = detail.value;
        if (!d) return "";
        const total = d.total_chapter_count || 0;
        const order = Math.max(0, Math.min(d.current_chapter_order || 0, total));
        if (!order) return total ? `未读 · 共${total}章` : "未读";
        return `${order}章/${total}章`;
      });
      const progressPercent = vue.computed(() => {
        const d = detail.value;
        if (!d || !d.total_chapter_count) return 0;
        const ratio = (d.current_chapter_order || 0) / d.total_chapter_count;
        return Math.max(0, Math.min(1, ratio)) * 100;
      });
      function onEnter2(event) {
        emit("hover", { entry: props.entry, el: event.currentTarget });
      }
      function onContextMenu(event) {
        event.preventDefault();
        emit("contextmenu", { entry: props.entry, x: event.clientX, y: event.clientY });
      }
      function open2(event) {
        emit("open", { entry: props.entry, mods: modifiersOf(event) });
      }
      function onAuxClick(event) {
        if (!isMiddleButton(event)) return;
        event.preventDefault();
        open2(event);
      }
      function onMouseDown(event) {
        if (isMiddleButton(event)) event.preventDefault();
      }
      const imgLoaded = vue.ref(false);
      vue.watch(
        () => {
          var _a;
          return (_a = detail.value) == null ? void 0 : _a.cover_url;
        },
        () => {
          imgLoaded.value = false;
        }
      );
      const cardRef = vue.ref(null);
      let io = null;
      vue.onMounted(() => {
        if (typeof IntersectionObserver === "undefined") {
          emit("visible", props.entry);
          return;
        }
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              emit("visible", props.entry);
            }
          },
          { rootMargin: "200px" }
        );
        if (cardRef.value) io.observe(cardRef.value);
      });
      vue.onBeforeUnmount(() => {
        io == null ? void 0 : io.disconnect();
        io = null;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "cardRef",
          ref: cardRef,
          class: "fqa-card",
          role: "link",
          tabindex: "0",
          "aria-label": title.value,
          onMouseenter: onEnter2,
          onMouseleave: _cache[2] || (_cache[2] = ($event) => emit("leave")),
          onContextmenu: onContextMenu,
          onClick: open2,
          onAuxclick: onAuxClick,
          onMousedown: onMouseDown,
          onKeydown: [
            vue.withKeys(vue.withModifiers(open2, ["prevent"]), ["enter"]),
            vue.withKeys(vue.withModifiers(open2, ["prevent"]), ["space"])
          ]
        }, [
          !detail.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            _cache[3] || (_cache[3] = vue.createElementVNode("div", { class: "fqa-sk-cover fqa-sk-anim" }, null, -1)),
            _cache[4] || (_cache[4] = vue.createElementVNode("div", {
              class: "fqa-sk-line fqa-sk-anim",
              style: { "width": "90%" }
            }, null, -1)),
            _cache[5] || (_cache[5] = vue.createElementVNode("div", {
              class: "fqa-sk-line fqa-sk-anim",
              style: { "width": "55%" }
            }, null, -1))
          ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createElementVNode("div", _hoisted_2$8, [
              vue.createElementVNode("img", {
                class: vue.normalizeClass(["fqa-cover-img", { "fqa-cover-img-loading": !imgLoaded.value }]),
                crossorigin: "anonymous",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                src: detail.value.cover_url,
                alt: title.value,
                onLoad: _cache[0] || (_cache[0] = ($event) => imgLoaded.value = true),
                onError: _cache[1] || (_cache[1] = ($event) => imgLoaded.value = true)
              }, null, 42, _hoisted_3$8),
              tag.value ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass(["fqa-cover-tag", tag.value.cls])
              }, vue.toDisplayString(tag.value.text), 3)) : vue.createCommentVNode("", true),
              progressPercent.value > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$7, [
                vue.createElementVNode("span", {
                  class: "fqa-cover-progress-bar",
                  style: vue.normalizeStyle({ width: progressPercent.value + "%" })
                }, null, 4)
              ])) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("div", {
              class: "fqa-card-title",
              title: title.value
            }, vue.toDisplayString(title.value), 9, _hoisted_5$7),
            vue.createElementVNode("div", {
              class: "fqa-card-sub",
              title: detail.value.current_chapter_title
            }, vue.toDisplayString(progressText.value), 9, _hoisted_6$7)
          ], 64))
        ], 40, _hoisted_1$8);
      };
    }
  });
  const _hoisted_1$7 = ["aria-label"];
  const _hoisted_2$7 = { class: "fqa-group-cover" };
  const _hoisted_3$7 = { class: "fqa-group-grid" };
  const _hoisted_4$6 = ["src", "alt"];
  const _hoisted_5$6 = ["title"];
  const _hoisted_6$6 = { class: "fqa-card-sub" };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookGroupCard",
    props: {
      group: {}
    },
    emits: ["open", "visible"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const previewBooks = vue.computed(() => props.group.books.slice(0, 4));
      const covers = vue.computed(
        () => previewBooks.value.map((entry) => entry.detail).filter((detail) => !!detail)
      );
      const cardRef = vue.ref(null);
      let io = null;
      function request() {
        const pending = previewBooks.value.filter((entry) => !entry.detail);
        if (pending.length) emit("visible", pending);
      }
      vue.onMounted(() => {
        if (typeof IntersectionObserver === "undefined") {
          request();
          return;
        }
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) request();
          },
          { rootMargin: "200px" }
        );
        if (cardRef.value) io.observe(cardRef.value);
      });
      vue.onBeforeUnmount(() => {
        io == null ? void 0 : io.disconnect();
        io = null;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "cardRef",
          ref: cardRef,
          class: "fqa-card",
          role: "button",
          tabindex: "0",
          "aria-label": `分组 ${__props.group.name}`,
          onClick: _cache[0] || (_cache[0] = ($event) => emit("open", __props.group)),
          onKeydown: [
            _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(($event) => emit("open", __props.group), ["prevent"]), ["enter"])),
            _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(($event) => emit("open", __props.group), ["prevent"]), ["space"]))
          ]
        }, [
          vue.createElementVNode("div", _hoisted_2$7, [
            vue.createElementVNode("div", _hoisted_3$7, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(covers.value, (detail) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: detail.book_id,
                  class: "fqa-group-cell"
                }, [
                  vue.createElementVNode("img", {
                    crossorigin: "anonymous",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    src: detail.cover_url,
                    alt: detail.title
                  }, null, 8, _hoisted_4$6)
                ]);
              }), 128))
            ])
          ]),
          vue.createElementVNode("div", {
            class: "fqa-card-title",
            title: __props.group.name
          }, vue.toDisplayString(__props.group.name), 9, _hoisted_5$6),
          vue.createElementVNode("div", _hoisted_6$6, "共" + vue.toDisplayString(__props.group.books.length) + "本书", 1)
        ], 40, _hoisted_1$7);
      };
    }
  });
  const SECOND = 1e3;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  function normalizeTimestamp(ts) {
    if (!ts || ts <= 0) return 0;
    return ts < 1e12 ? ts * 1e3 : ts;
  }
  function fromNow(ts) {
    const time = normalizeTimestamp(ts);
    if (!time) return "从未";
    const diff = Date.now() - time;
    if (diff < MINUTE) return "刚刚";
    if (diff < HOUR) return `${Math.floor(diff / MINUTE)}分钟前`;
    if (diff < DAY) return `${Math.floor(diff / HOUR)}小时前`;
    if (diff < MONTH) return `${Math.floor(diff / DAY)}天前`;
    if (diff < YEAR) return `${Math.floor(diff / MONTH)}个月前`;
    return `${Math.floor(diff / YEAR)}年前`;
  }
  function formatDateTime(ts) {
    const time = normalizeTimestamp(ts);
    if (!time) return "未知";
    const d = new Date(time);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  const _hoisted_1$6 = ["title"];
  const _hoisted_2$6 = {
    key: 0,
    class: "fqa-hover-author"
  };
  const _hoisted_3$6 = { class: "fqa-hover-stats" };
  const _hoisted_4$5 = ["title"];
  const _hoisted_5$5 = { class: "fqa-hover-stat-k" };
  const _hoisted_6$5 = { class: "fqa-hover-stat" };
  const _hoisted_7$5 = { class: "fqa-hover-stat-v" };
  const _hoisted_8$5 = { class: "fqa-hover-stat" };
  const _hoisted_9$5 = { class: "fqa-hover-stat-v" };
  const _hoisted_10$5 = { class: "fqa-hover-seg" };
  const _hoisted_11$4 = { class: "fqa-hover-abstract" };
  const _hoisted_12$4 = {
    key: 0,
    class: "fqa-hover-chapter"
  };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookHoverCard",
    props: {
      entry: {},
      x: {},
      y: {},
      height: {},
      visible: { type: Boolean }
    },
    emits: ["panel-enter", "panel-leave"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const detail = vue.computed(() => {
        var _a;
        return ((_a = props.entry) == null ? void 0 : _a.detail) ?? null;
      });
      const item = vue.computed(() => {
        var _a;
        return ((_a = props.entry) == null ? void 0 : _a.item) ?? null;
      });
      const readAt = vue.computed(() => {
        var _a;
        return fromNow((_a = item.value) == null ? void 0 : _a.last_read_timestamp);
      });
      const addedAt = vue.computed(() => {
        var _a;
        return fromNow((_a = item.value) == null ? void 0 : _a.add_shelf_time);
      });
      const updatedAt = vue.computed(() => {
        var _a;
        return fromNow((_a = detail.value) == null ? void 0 : _a.last_chapter_update_time);
      });
      const updatedAtFull = vue.computed(() => {
        var _a;
        return formatDateTime((_a = detail.value) == null ? void 0 : _a.last_chapter_update_time);
      });
      const showUpdateTime = vue.ref(false);
      const latestChapter = vue.computed(() => {
        const d = detail.value;
        if (!d) return "—";
        return d.total_chapter_count ? `${d.total_chapter_count}章` : "—";
      });
      const pickedTab = vue.ref(null);
      const chapterText = vue.computed(() => {
        var _a, _b;
        return ((_b = (_a = detail.value) == null ? void 0 : _a.current_chapter_summary) == null ? void 0 : _b.trim()) ?? "";
      });
      const bookText = vue.computed(() => {
        var _a, _b;
        return ((_b = (_a = detail.value) == null ? void 0 : _a.summary) == null ? void 0 : _b.trim()) ?? "";
      });
      const activeTab = vue.computed(() => {
        if (pickedTab.value) return pickedTab.value;
        return chapterText.value ? "chapter" : "book";
      });
      const abstractText = vue.computed(() => {
        const text = activeTab.value === "chapter" ? chapterText.value : bookText.value;
        return text || "暂无数据";
      });
      vue.watch(
        () => {
          var _a;
          return (_a = props.entry) == null ? void 0 : _a.item.book_id;
        },
        () => {
          pickedTab.value = null;
          showUpdateTime.value = false;
        }
      );
      const root = vue.ref(null);
      const supportsPopover = typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function";
      vue.watch(
        () => props.visible && !!detail.value,
        (show) => {
          const el = root.value;
          if (!el || !supportsPopover) return;
          try {
            if (show) el.showPopover();
            else el.hidePopover();
          } catch {
          }
        }
      );
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          id: "fqa-bookshelf-hover",
          ref_key: "root",
          ref: root,
          popover: "manual",
          class: vue.normalizeClass({ "fqa-visible": __props.visible && !!detail.value }),
          style: vue.normalizeStyle({ left: __props.x + "px", top: __props.y + "px" }),
          onMouseenter: _cache[4] || (_cache[4] = ($event) => emit("panel-enter")),
          onMouseleave: _cache[5] || (_cache[5] = ($event) => emit("panel-leave"))
        }, [
          detail.value ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "fqa-hover-inner",
            style: vue.normalizeStyle(__props.height ? { height: __props.height + "px" } : void 0)
          }, [
            vue.createElementVNode("div", {
              class: "fqa-hover-title",
              title: detail.value.title
            }, vue.toDisplayString(detail.value.title), 9, _hoisted_1$6),
            detail.value.author ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$6, vue.toDisplayString(detail.value.author), 1)) : vue.createCommentVNode("", true),
            vue.createElementVNode("div", _hoisted_3$6, [
              vue.createElementVNode("div", {
                class: "fqa-hover-stat",
                onMouseenter: _cache[0] || (_cache[0] = ($event) => showUpdateTime.value = true),
                onMouseleave: _cache[1] || (_cache[1] = ($event) => showUpdateTime.value = false)
              }, [
                vue.createElementVNode("div", {
                  class: "fqa-hover-stat-v",
                  title: updatedAtFull.value
                }, vue.toDisplayString(showUpdateTime.value ? updatedAt.value : latestChapter.value), 9, _hoisted_4$5),
                vue.createElementVNode("div", _hoisted_5$5, vue.toDisplayString(showUpdateTime.value ? "更新于" : "最新章"), 1)
              ], 32),
              vue.createElementVNode("div", _hoisted_6$5, [
                vue.createElementVNode("div", _hoisted_7$5, vue.toDisplayString(readAt.value), 1),
                _cache[6] || (_cache[6] = vue.createElementVNode("div", { class: "fqa-hover-stat-k" }, "阅读过", -1))
              ]),
              vue.createElementVNode("div", _hoisted_8$5, [
                vue.createElementVNode("div", _hoisted_9$5, vue.toDisplayString(addedAt.value), 1),
                _cache[7] || (_cache[7] = vue.createElementVNode("div", { class: "fqa-hover-stat-k" }, "已加入书架", -1))
              ])
            ]),
            vue.createElementVNode("div", _hoisted_10$5, [
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["fqa-hover-seg-btn", { "fqa-hover-seg-active": activeTab.value === "chapter" }]),
                onClick: _cache[2] || (_cache[2] = ($event) => pickedTab.value = "chapter")
              }, " 本章梗概 ", 2),
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["fqa-hover-seg-btn", { "fqa-hover-seg-active": activeTab.value === "book" }]),
                onClick: _cache[3] || (_cache[3] = ($event) => pickedTab.value = "book")
              }, " 全书简介 ", 2)
            ]),
            vue.createElementVNode("div", _hoisted_11$4, [
              activeTab.value === "chapter" && detail.value.current_chapter_title ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12$4, vue.toDisplayString(detail.value.current_chapter_title), 1)) : vue.createCommentVNode("", true),
              vue.createTextVNode(" " + vue.toDisplayString(abstractText.value), 1)
            ])
          ], 4)) : vue.createCommentVNode("", true)
        ], 38);
      };
    }
  });
  const _hoisted_1$5 = ["aria-disabled", "onMouseenter", "onClick"];
  const _hoisted_2$5 = {
    key: 0,
    class: "fqa-menu-arrow"
  };
  const _hoisted_3$5 = ["onClick"];
  const MARGIN = 8;
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "ContextMenu",
    props: {
      visible: { type: Boolean },
      x: {},
      y: {},
      items: {}
    },
    emits: ["select", "close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const rootRef = vue.ref(null);
      const subRef = vue.ref(null);
      const openKey = vue.ref(null);
      const pos = vue.ref({ x: 0, y: 0 });
      const subPos = vue.ref({ x: 0, y: 0 });
      async function place() {
        pos.value = { x: props.x, y: props.y };
        await vue.nextTick();
        const el = rootRef.value;
        if (!el) return;
        const { width, height } = el.getBoundingClientRect();
        let x = props.x;
        let y = props.y;
        if (x + width > window.innerWidth - MARGIN) x = props.x - width;
        if (y + height > window.innerHeight - MARGIN) y = window.innerHeight - height - MARGIN;
        pos.value = {
          x: Math.max(MARGIN, x),
          y: Math.max(MARGIN, y)
        };
      }
      vue.watch(
        () => [props.visible, props.x, props.y],
        () => {
          openKey.value = null;
          if (props.visible) void place();
        }
      );
      async function openSub(item, event) {
        var _a;
        if (!((_a = item.children) == null ? void 0 : _a.length)) {
          openKey.value = null;
          return;
        }
        openKey.value = item.key;
        const row = event.currentTarget;
        const rect = row.getBoundingClientRect();
        subPos.value = { x: rect.right - 2, y: rect.top };
        await vue.nextTick();
        const el = subRef.value;
        if (!el) return;
        const { width, height } = el.getBoundingClientRect();
        let x = rect.right - 2;
        let y = rect.top;
        if (x + width > window.innerWidth - MARGIN) x = rect.left - width + 2;
        if (y + height > window.innerHeight - MARGIN) y = window.innerHeight - height - MARGIN;
        subPos.value = { x: Math.max(MARGIN, x), y: Math.max(MARGIN, y) };
      }
      function choose(item) {
        var _a;
        if (item.disabled || ((_a = item.children) == null ? void 0 : _a.length)) return;
        emit("select", item.key);
        emit("close");
      }
      function onDocPointer(e) {
        var _a, _b;
        const t = e.target;
        if (((_a = rootRef.value) == null ? void 0 : _a.contains(t)) || ((_b = subRef.value) == null ? void 0 : _b.contains(t))) return;
        emit("close");
      }
      function onKey(e) {
        if (e.key === "Escape") emit("close");
      }
      vue.onMounted(() => {
        document.addEventListener("pointerdown", onDocPointer, true);
        document.addEventListener("keydown", onKey);
        window.addEventListener("scroll", () => emit("close"), true);
      });
      vue.onBeforeUnmount(() => {
        document.removeEventListener("pointerdown", onDocPointer, true);
        document.removeEventListener("keydown", onKey);
      });
      const style = vue.computed(() => ({ left: `${pos.value.x}px`, top: `${pos.value.y}px` }));
      const subStyle = vue.computed(() => ({ left: `${subPos.value.x}px`, top: `${subPos.value.y}px` }));
      const activeChildren = vue.computed(
        () => {
          var _a;
          return ((_a = props.items.find((i2) => i2.key === openKey.value)) == null ? void 0 : _a.children) ?? [];
        }
      );
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          __props.visible ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            ref_key: "rootRef",
            ref: rootRef,
            class: "fqa-menu",
            style: vue.normalizeStyle(style.value),
            role: "menu"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.items, (item) => {
              var _a;
              return vue.openBlock(), vue.createElementBlock("div", {
                key: item.key,
                class: vue.normalizeClass(["fqa-menu-row", {
                  "fqa-menu-danger": item.danger,
                  "fqa-menu-disabled": item.disabled,
                  "fqa-menu-open": openKey.value === item.key
                }]),
                role: "menuitem",
                "aria-disabled": item.disabled,
                onMouseenter: ($event) => openSub(item, $event),
                onClick: ($event) => choose(item)
              }, [
                vue.createElementVNode("span", null, vue.toDisplayString(item.label), 1),
                ((_a = item.children) == null ? void 0 : _a.length) ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$5, "›")) : vue.createCommentVNode("", true)
              ], 42, _hoisted_1$5);
            }), 128))
          ], 4)) : vue.createCommentVNode("", true),
          __props.visible && activeChildren.value.length ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            ref_key: "subRef",
            ref: subRef,
            class: "fqa-menu fqa-menu-sub",
            style: vue.normalizeStyle(subStyle.value),
            role: "menu"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(activeChildren.value, (child) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: child.key,
                class: vue.normalizeClass(["fqa-menu-row", { "fqa-menu-disabled": child.disabled }]),
                role: "menuitem",
                onClick: ($event) => choose(child)
              }, [
                vue.createElementVNode("span", null, vue.toDisplayString(child.label), 1)
              ], 10, _hoisted_3$5);
            }), 128))
          ], 4)) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  });
  const DETAIL_BATCH_SIZE = 20;
  const PAGE_SIZE = 24;
  const TABS = [
    { key: "all", label: "全部" },
    { key: "group", label: "分组" },
    { key: "publish", label: "出版" }
  ];
  function useBookshelf() {
    const entries = vue.ref([]);
    const loading = vue.ref(false);
    const detailLoading = vue.ref(false);
    const error = vue.ref(null);
    let loadToken = 0;
    let detailCache = /* @__PURE__ */ new Map();
    let inflight = /* @__PURE__ */ new Set();
    function applyDetails(details) {
      if (!details.length) return;
      const byId = new Map(details.map((d) => [d.book_id, d]));
      entries.value = entries.value.map((entry) => {
        const detail = byId.get(entry.item.book_id);
        return detail ? { ...entry, detail } : entry;
      });
    }
    async function ensureDetails(items) {
      const token = loadToken;
      const pending = items.filter(
        (item) => !detailCache.has(item.book_id) && !inflight.has(item.book_id)
      );
      if (!pending.length) return;
      pending.forEach((item) => inflight.add(item.book_id));
      detailLoading.value = true;
      try {
        for (const batch of chunk(pending, DETAIL_BATCH_SIZE)) {
          if (token !== loadToken) return;
          try {
            const details = await multidetail(batch);
            if (token !== loadToken) return;
            details.forEach((d) => detailCache.set(d.book_id, d));
            applyDetails(details);
          } catch (err) {
            console.error("[fqa:bookshelf] 加载书籍详情失败:", err);
          }
        }
      } finally {
        pending.forEach((item) => inflight.delete(item.book_id));
        if (token === loadToken && inflight.size === 0) detailLoading.value = false;
      }
    }
    async function load2(force = false) {
      const token = ++loadToken;
      inflight.clear();
      if (force) detailCache = /* @__PURE__ */ new Map();
      loading.value = true;
      error.value = null;
      try {
        const items = await getBookshelf();
        if (token !== loadToken) return;
        items.sort((a, b) => b.last_operate_time - a.last_operate_time);
        entries.value = items.map((item) => ({
          item,
          detail: detailCache.get(item.book_id) ?? null
        }));
        loading.value = false;
      } catch (err) {
        if (token !== loadToken) return;
        console.error("[fqa:bookshelf] 加载书架失败:", err);
        error.value = err instanceof Error ? err.message : String(err);
        loading.value = false;
      }
    }
    const groups = vue.computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const entry of entries.value) {
        const name2 = entry.item.group_name;
        if (!name2) continue;
        let group = map.get(name2);
        if (!group) {
          group = { name: name2, books: [], last_operate_time: 0 };
          map.set(name2, group);
        }
        group.books.push(entry);
        group.last_operate_time = Math.max(group.last_operate_time, entry.item.last_operate_time);
      }
      return [...map.values()].sort((a, b) => b.last_operate_time - a.last_operate_time);
    });
    const allCells = vue.computed(() => {
      const sortable = [];
      for (const entry of entries.value) {
        if (entry.item.group_name) continue;
        sortable.push({
          time: entry.item.last_operate_time,
          cell: { kind: "book", key: `book:${entry.item.book_id}`, entry }
        });
      }
      for (const group of groups.value) {
        sortable.push({
          time: group.last_operate_time,
          cell: { kind: "group", key: `group:${group.name}`, group }
        });
      }
      return sortable.sort((a, b) => b.time - a.time).map((s) => s.cell);
    });
    const groupCells = vue.computed(
      () => groups.value.map((group) => ({ kind: "group", key: `group:${group.name}`, group }))
    );
    const publishCells = vue.computed(
      () => entries.value.filter((entry) => entry.item.is_publish).map((entry) => ({ kind: "book", key: `book:${entry.item.book_id}`, entry }))
    );
    const counts = vue.computed(() => ({
      all: entries.value.length,
      group: groups.value.length,
      publish: entries.value.filter((entry) => entry.item.is_publish).length
    }));
    function cellsOf(tab) {
      if (tab === "group") return groupCells.value;
      if (tab === "publish") return publishCells.value;
      return allCells.value;
    }
    function findGroup(name2) {
      return groups.value.find((group) => group.name === name2) ?? null;
    }
    return {
      entries,
      loading,
      detailLoading,
      error,
      groups,
      counts,
      load: load2,
      ensureDetails,
      cellsOf,
      findGroup,
      PAGE_SIZE
    };
  }
  class CancelledError extends Error {
    constructor() {
      super("已取消");
      this.name = "CancelledError";
    }
  }
  class DownloadTask {
    constructor() {
      __publicField(this, "state", {
        title: "准备中…",
        current: 0,
        total: 0,
        subtitle: "",
        percentOnly: false,
        done: false,
        error: null,
        cancelled: false
      });
      __publicField(this, "listeners", /* @__PURE__ */ new Set());
    }
    get snapshot() {
      return this.state;
    }
    get isCancelled() {
      return this.state.cancelled;
    }
    subscribe(listener) {
      this.listeners.add(listener);
      listener(this.state);
      return () => this.listeners.delete(listener);
    }
    emit(patch) {
      this.state = { ...this.state, ...patch };
      for (const listener of this.listeners) {
        try {
          listener(this.state);
        } catch (err) {
          console.error("[fqa:download] 进度回调异常:", err);
        }
      }
    }
    /** 进入新阶段，重置计数 */
    stage(title, total = 0) {
      this.emit({ title, total, current: 0, subtitle: "", percentOnly: false });
    }
    /** 进入一个按百分比汇报的阶段（如 zip 压缩） */
    stagePercent(title) {
      this.emit({ title, total: 100, current: 0, subtitle: "", percentOnly: true });
    }
    update(current, subtitle) {
      this.emit(subtitle === void 0 ? { current } : { current, subtitle });
    }
    /** 在当前计数上累加，供并发/分批场景使用 */
    advance(delta = 1, subtitle) {
      this.update(this.state.current + delta, subtitle);
    }
    setTotal(total) {
      this.emit({ total });
    }
    setSubtitle(subtitle) {
      this.emit({ subtitle });
    }
    cancel() {
      if (this.state.done) return;
      this.emit({ cancelled: true, title: "已取消", subtitle: "" });
    }
    finish(title = "完成") {
      this.emit({ done: true, title, subtitle: "" });
    }
    fail(error) {
      const message = error instanceof Error ? error.message : String(error);
      this.emit({ done: true, error: message, title: "下载失败" });
    }
    /** 取消时抛出，让调用栈直接退出 */
    throwIfCancelled() {
      if (this.state.cancelled) throw new CancelledError();
    }
  }
  const MAX_BATCH_SIZE = 30;
  function hasContent(chapter) {
    return Boolean(chapter == null ? void 0 : chapter.content) && chapter.content !== "Invalid";
  }
  async function fetchChapters(itemIds, bookId2, task, options = {}) {
    var _a;
    const batchSize = Math.min(
      Math.max(1, options.batchSize ?? settings$1.downloadBatchSize),
      MAX_BATCH_SIZE
    );
    const interval = Math.max(0, options.interval ?? settings$1.downloadInterval);
    const retries = Math.max(0, options.retries ?? settings$1.downloadRetries);
    const chapters = {};
    let pending = [...itemIds];
    task.stage("缓存章节…", itemIds.length);
    for (let round = 0; round <= retries && pending.length > 0; round++) {
      if (round > 0) {
        console.warn(`[fqa:download] 第 ${round} 轮重试，剩余 ${pending.length} 章`);
        task.setSubtitle(`重试 ${pending.length} 章（第 ${round} 轮）`);
        await sleep(Math.max(interval, 1e3));
      }
      const missed = [];
      const batches = chunk(pending, batchSize);
      for (let i2 = 0; i2 < batches.length; i2++) {
        task.throwIfCancelled();
        const batch = batches[i2];
        try {
          const result = await getChapters(batch, bookId2);
          for (const itemId2 of batch) {
            const chapter = result[itemId2];
            if (hasContent(chapter)) {
              chapters[itemId2] = chapter;
            } else {
              missed.push(itemId2);
            }
          }
        } catch (err) {
          if (err instanceof CancelledError) throw err;
          console.error("[fqa:download] 批量获取失败:", err);
          missed.push(...batch);
        }
        const got = Object.keys(chapters).length;
        const lastTitle = ((_a = options.titleOf) == null ? void 0 : _a.call(options, batch[batch.length - 1])) ?? "";
        task.update(got, lastTitle);
        if (i2 < batches.length - 1 && interval > 0) await sleep(interval);
      }
      pending = missed;
    }
    if (pending.length > 0) {
      console.warn(`[fqa:download] ${pending.length} 章最终失败:`, pending.slice(0, 20));
    }
    return { chapters, failed: pending };
  }
  const FLAG = "__fqaSetImmediate";
  function installSetImmediate(target) {
    if (target[FLAG]) return false;
    const tasks = /* @__PURE__ */ new Map();
    let nextId = 1;
    const run = (id) => {
      const task = tasks.get(id);
      if (!task) return;
      tasks.delete(id);
      try {
        task.fn(...task.args);
      } catch (err) {
        console.error("[fqa:zipfix] setImmediate 任务异常:", err);
      }
    };
    let schedule;
    if (typeof MessageChannel === "function") {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => run(event.data);
      schedule = (id) => channel.port2.postMessage(id);
    } else {
      schedule = (id) => void setTimeout(run, 0, id);
    }
    target["setImmediate"] = (fn, ...args) => {
      const id = nextId++;
      tasks.set(id, { fn, args });
      schedule(id);
      return id;
    };
    target["clearImmediate"] = (id) => void tasks.delete(id);
    target[FLAG] = true;
    return true;
  }
  function fixZipScheduler() {
    const patched = installSetImmediate(globalThis);
    try {
      const real = unsafeWindow;
      if (real && real !== globalThis) {
        installSetImmediate(real);
      }
    } catch {
    }
    if (patched) console.debug("[fqa:zipfix] 已替换 setImmediate，修复 JSZip 异步调度");
  }
  /*!
   * llepub-saver - v1.0.3 (TypeScript port)
   * An EPUB ebook saving library for browser.
   * License: GPLv3 (https://www.gnu.org/licenses/gpl-3.0.html)
   *
   * 依赖：
   * - Moment.js (https://momentjs.com/) - MIT License
   * - JSZip (https://stuk.github.io/jszip/) - Dual-licensed under MIT and GPLv3.
   *
   * 相对原 JS 版的改动：
   * - 补齐类型，改成 ES module import（JSZip / moment 不再依赖全局变量）；
   * - 网络请求可注入（见 EpubSaverOptions），默认用页面 fetch。番茄的部分图床
   *   不给 CORS 头，调用方可以传入走 GM_xmlhttpRequest 的实现；
   * - 图片扩展名改为嗅探文件头，注入式 fetch 拿不到响应头也能判断；
   * - 写入 XML 的文本（标题、作者、简介等）统一转义，否则含 & < 的书名会
   *   生成非法 XML，阅读器直接打不开。
   */
  fixZipScheduler();
  function yieldFrame() {
    return new Promise((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      const raf = globalThis.requestAnimationFrame;
      if (typeof raf === "function") raf(done);
      setTimeout(done, 32);
    });
  }
  const DEFAULT_I18N = {
    en: { cover: "Cover", tableOfContents: "Table of Contents", chapters: "Chapters" },
    "zh-CN": { cover: "封面", tableOfContents: "目录", chapters: "章节" },
    "zh-TW": { cover: "封面", tableOfContents: "目錄", chapters: "章節" },
    es: { cover: "Portada", tableOfContents: "Índice", chapters: "Capítulos" },
    fr: { cover: "Couverture", tableOfContents: "Table des matières", chapters: "Chapitres" },
    de: { cover: "Cover", tableOfContents: "Inhaltsverzeichnis", chapters: "Kapitel" },
    ja: { cover: "表紙", tableOfContents: "目次", chapters: "章" },
    ko: { cover: "표지", tableOfContents: "목차", chapters: "장" },
    ru: { cover: "Обложка", tableOfContents: "Содержание", chapters: "Главы" },
    pt: { cover: "Capa", tableOfContents: "Índice", chapters: "Capítulos" },
    it: { cover: "Copertina", tableOfContents: "Indice", chapters: "Capitoli" }
  };
  const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const DC_ELEMENTS = /* @__PURE__ */ new Set([
    "title",
    "creator",
    "subject",
    "description",
    "publisher",
    "contributor",
    "date",
    "type",
    "format",
    "identifier",
    "source",
    "language",
    "relation",
    "coverage",
    "rights"
  ]);
  function escapeXml(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  function sniffImageExtension(buffer, url) {
    var _a, _b;
    const b = new Uint8Array(buffer.slice(0, 16));
    if (b[0] === 255 && b[1] === 216) return "jpg";
    if (b[0] === 137 && b[1] === 80 && b[2] === 78 && b[3] === 71) return "png";
    if (b[0] === 71 && b[1] === 73 && b[2] === 70) return "gif";
    if (b[0] === 82 && b[1] === 73 && b[2] === 70 && b[3] === 70 && b[8] === 87 && b[9] === 69 && b[10] === 66 && b[11] === 80) return "webp";
    const head = new TextDecoder().decode(b).trimStart();
    if (head.startsWith("<svg") || head.startsWith("<?xml")) return "svg";
    const urlExt = ((_b = (_a = url.split("?")[0]) == null ? void 0 : _a.split(".").pop()) == null ? void 0 : _b.toLowerCase()) ?? "";
    return IMAGE_EXTENSIONS.includes(urlExt) ? urlExt : "jpg";
  }
  function mimeOf(extension) {
    switch (extension) {
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "webp":
        return "image/webp";
      case "svg":
        return "image/svg+xml";
      default:
        return "image/jpeg";
    }
  }
  async function defaultFetchBinary(url) {
    const res = await fetch$1(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.arrayBuffer();
  }
  async function defaultFetchText(url) {
    const res = await fetch$1(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.text();
  }
  const _EpubSaver = class _EpubSaver {
    constructor(options = {}) {
      __publicField(this, "zip", new JSZip());
      __publicField(this, "metadata", /* @__PURE__ */ new Map());
      __publicField(this, "volumes", /* @__PURE__ */ new Map());
      /** addCSS 的样式：idx -> 内容。idx 0 是全局样式 */
      __publicField(this, "cssFiles", /* @__PURE__ */ new Map());
      /** addCSSMap 的样式：EPUB 内文件名 -> 内容 */
      __publicField(this, "cssMap", /* @__PURE__ */ new Map());
      /** 正文里的原始 CSS 路径 -> EPUB 内相对路径 */
      __publicField(this, "cssPathMapping", /* @__PURE__ */ new Map());
      /** 正文插图：文件名 -> 数据 */
      __publicField(this, "images", /* @__PURE__ */ new Map());
      __publicField(this, "coverBuffer", null);
      __publicField(this, "coverExtension", null);
      __publicField(this, "i18n", { ...DEFAULT_I18N });
      __publicField(this, "fetchBinary");
      __publicField(this, "fetchText");
      __publicField(this, "imageMode");
      this.fetchBinary = options.fetchBinary ?? defaultFetchBinary;
      this.fetchText = options.fetchText ?? defaultFetchText;
      this.imageMode = options.images ?? "download";
      this.setInfo("identifier", getCrypto().randomUUID(), { scheme: "uuid" });
      this.setInfo("date", moment().format("YYYY-MM-DDTHH:mm:ss[Z]"), {
        "opf:event": "modification"
      });
      this.setInfo("language", "en");
      this.setInfo("title", "Untitled Book");
      this.setInfo("creator", "Unknown Author");
    }
    setI18n(language, translations) {
      this.i18n[language] = {
        ...this.i18n[language] ?? this.i18n["en"],
        ...translations
      };
    }
    t(key) {
      var _a, _b;
      const language = ((_a = this.metadata.get("language")) == null ? void 0 : _a.value) ?? "en";
      return ((_b = this.i18n[language]) == null ? void 0 : _b[key]) ?? this.i18n["en"][key] ?? key;
    }
    meta(key, fallback) {
      var _a;
      return ((_a = this.metadata.get(key)) == null ? void 0 : _a.value) || fallback;
    }
    setInfo(key, value, options = {}) {
      this.metadata.set(key, { value, options });
    }
    /** 设置封面。传 URL 会去下载，也可以直接给字节 */
    async cover(input) {
      if (typeof input !== "string") {
        this.coverBuffer = input;
        this.coverExtension = sniffImageExtension(input, "");
        return;
      }
      try {
        const buffer = await this.fetchBinary(input);
        this.coverBuffer = buffer;
        this.coverExtension = sniffImageExtension(buffer, input);
      } catch (error) {
        throw new Error(`Failed to fetch cover image: ${error.message}`);
      }
    }
    async addVolume(idx, title, options = {}) {
      const volume = new EpubVolume(idx, title, this, options);
      this.volumes.set(idx, volume);
      return volume;
    }
    /** 注册一份样式表。idx 0 会作为全局样式被章节引用 */
    async addCSS(idx, content, mappath) {
      const existing = this.cssFiles.get(idx);
      if (existing && mappath && existing.mappath !== mappath) {
        throw new Error(`CSS index ${idx} already exists with different mappath`);
      }
      this.cssFiles.set(idx, { content, mappath });
    }
    /**
     * 注册正文 <link> 引用的样式表。
     * 传 { 'Styles/main.css': 'https://…' | 'css 文本' }，
     * 值以 http 开头时会去下载。
     */
    async addCSSMap(pathMap) {
      for (const [originalPath, urlOrContent] of Object.entries(pathMap)) {
        const normalizedOriginal = originalPath.startsWith("Styles/") ? originalPath.substring(7) : originalPath;
        let finalPath = normalizedOriginal;
        if (/^style\d+\.css$/.test(finalPath)) {
          let counter = 1e3;
          while (this.cssFiles.has(counter) || this.cssMap.has(`style${counter}.css`)) {
            counter++;
          }
          finalPath = `style${counter}.css`;
          console.warn(`CSS conflict detected, renamed ${normalizedOriginal} to ${finalPath}`);
        }
        this.cssPathMapping.set(originalPath, `../Styles/${finalPath}`);
        if (urlOrContent.startsWith("http")) {
          try {
            this.cssMap.set(finalPath, await this.fetchText(urlOrContent));
          } catch (error) {
            throw new Error(`Failed to fetch CSS: ${error.message}`);
          }
        } else {
          this.cssMap.set(finalPath, urlOrContent);
        }
      }
    }
    /** 内容里的 Unicode 转义序列还原。失败时原样返回 */
    static decodeEscapes(content) {
      try {
        return JSON.parse('"' + content.replace(/"/g, '\\"') + '"');
      } catch {
        return content;
      }
    }
    static parseFragment(content) {
      const parser = new DOMParser();
      const whole = /<html[\s>]/i.test(content) || content.includes("<!DOCTYPE");
      const source = whole ? content : `<html><head></head><body>${content}</body></html>`;
      return { doc: parser.parseFromString(source, "text/html"), whole };
    }
    static serializeFragment(doc, whole) {
      if (whole) return new XMLSerializer().serializeToString(doc.documentElement);
      return doc.body.innerHTML;
    }
    /** 把正文里的 CSS 引用重写到 EPUB 内的路径，map 里没有的直接删掉 */
    async processCSSLinksInContent(content) {
      const decoded = _EpubSaver.decodeEscapes(content);
      try {
        const { doc, whole } = _EpubSaver.parseFragment(decoded);
        const cssLinks = doc.querySelectorAll('link[rel="stylesheet"], link[type="text/css"]');
        for (const link of cssLinks) {
          const href = link.getAttribute("href");
          if (!href) continue;
          const mapped = this.cssPathMapping.get(href);
          if (mapped) {
            link.setAttribute("href", mapped);
            console.debug(`Updated CSS reference: ${href} -> ${mapped}`);
          } else {
            console.warn(`CSS reference not found in CSSMap, removing: ${href}`);
            link.remove();
          }
        }
        return _EpubSaver.serializeFragment(doc, whole);
      } catch (error) {
        console.warn("Error processing CSS links in content:", error);
        return decoded;
      }
    }
    /** 下载正文里的外链图片并改写成 EPUB 内相对路径，下载失败的删掉 img */
    async downloadImagesFromContent(content) {
      if (this.imageMode === "keep") return content;
      const decoded = content.includes("\\u") ? _EpubSaver.decodeEscapes(content) : content;
      try {
        const { doc, whole } = _EpubSaver.parseFragment(decoded);
        const images = doc.querySelectorAll("img[src]");
        let imageCounter = this.images.size;
        for (const img of images) {
          const src = img.getAttribute("src");
          if (!src || !/^https?:\/\//.test(src)) continue;
          if (this.imageMode === "remove") {
            img.remove();
            continue;
          }
          let finalUrl = src;
          if (src.startsWith("http://")) finalUrl = src.replace("http://", "https://");
          let stored = null;
          for (const url of finalUrl === src ? [src] : [finalUrl, src]) {
            try {
              const buffer = await this.fetchBinary(url);
              const extension = sniffImageExtension(buffer, url);
              const filename = `image_${imageCounter++}.${extension}`;
              this.images.set(filename, { buffer, extension, originalUrl: src });
              stored = filename;
              break;
            } catch (error) {
              console.warn(`Failed to download image ${url}:`, error.message);
            }
          }
          if (stored) {
            img.setAttribute("src", `../Images/${stored}`);
          } else {
            console.warn(`Removing failed image tag: ${src}`);
            img.remove();
          }
        }
        return _EpubSaver.serializeFragment(doc, whole);
      } catch (error) {
        console.warn("Error processing images in content:", error);
        return decoded;
      }
    }
    generateContainer() {
      return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>`;
    }
    generateContentOpf() {
      let metadata = "";
      for (const [key, data] of this.metadata) {
        const optionsStr = Object.entries(data.options).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(" ");
        const attrs = optionsStr ? " " + optionsStr : "";
        if (DC_ELEMENTS.has(key)) {
          metadata += `        <dc:${key}${attrs}>${escapeXml(data.value)}</dc:${key}>
`;
        } else {
          metadata += `        <meta property="fqa:${key}"${attrs}>${escapeXml(data.value)}</meta>
`;
        }
      }
      metadata += `        <meta property="dcterms:modified">${escapeXml(
      this.meta("date", moment().format("YYYY-MM-DDTHH:mm:ss[Z]"))
    )}</meta>
`;
      if (this.coverBuffer) {
        metadata += `        <meta name="cover" content="cover-image" />
`;
      }
      let manifest = "";
      const spineItems = [];
      manifest += `        <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
`;
      manifest += `        <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
`;
      if (this.coverBuffer) {
        manifest += `        <item id="cover-image" href="Images/cover.${this.coverExtension}" media-type="${mimeOf(this.coverExtension)}" properties="cover-image"/>
`;
        manifest += `        <item id="cover" href="Text/cover.xhtml" media-type="application/xhtml+xml"/>
`;
        spineItems.push("cover");
      }
      for (const [filename, imageData] of this.images) {
        const imageId = `img-${filename.replace(/[^a-zA-Z0-9]/g, "-")}`;
        manifest += `        <item id="${imageId}" href="Images/${filename}" media-type="${mimeOf(imageData.extension)}"/>
`;
      }
      for (const idx of this.cssFiles.keys()) {
        manifest += `        <item id="css${idx}" href="Styles/style${idx}.css" media-type="text/css"/>
`;
      }
      for (const path of this.cssMap.keys()) {
        const id = `css-map-${path.replace(/[^a-zA-Z0-9]/g, "-")}`;
        manifest += `        <item id="${id}" href="Styles/${path}" media-type="text/css"/>
`;
      }
      for (const [volIdx, volume] of this.sortedVolumes()) {
        if (volume.options.createVolumePage) {
          const volumeId = `volume-page-${volIdx}`;
          manifest += `        <item id="${volumeId}" href="Text/volume${volIdx}_index.xhtml" media-type="application/xhtml+xml"/>
`;
          spineItems.push(volumeId);
        }
        for (const [chapIdx] of volume.sortedChapters()) {
          const id = `chapter-${volIdx}-${chapIdx}`;
          manifest += `        <item id="${id}" href="Text/volume${volIdx}_chapter${chapIdx}.xhtml" media-type="application/xhtml+xml"/>
`;
          spineItems.push(id);
        }
      }
      const spine = spineItems.map((id) => `        <itemref idref="${id}"/>`).join("\n");
      return `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
${metadata}    </metadata>
    <manifest>
${manifest}    </manifest>
    <spine toc="ncx">
${spine}
    </spine>
</package>`;
    }
    sortedVolumes() {
      return Array.from(this.volumes.entries()).sort(([a], [b]) => a - b);
    }
    /** 卷在目录里的链接：有卷页指向卷页，否则指向首章 */
    volumeLink(volIdx, volume) {
      var _a;
      if (volume.options.createVolumePage) return `Text/volume${volIdx}_index.xhtml`;
      const first = ((_a = volume.sortedChapters()[0]) == null ? void 0 : _a[0]) ?? 0;
      return `Text/volume${volIdx}_chapter${first}.xhtml`;
    }
    generateTocNcx() {
      const title = this.meta("title", "Untitled Book");
      const uuid2 = this.meta("identifier", getCrypto().randomUUID());
      let navPoints = "";
      let playOrder = 1;
      if (this.coverBuffer) {
        navPoints += `        <navPoint id="cover" playOrder="${playOrder++}">
            <navLabel><text>${escapeXml(this.t("cover"))}</text></navLabel>
            <content src="Text/cover.xhtml"/>
        </navPoint>
`;
      }
      for (const [volIdx, volume] of this.sortedVolumes()) {
        const link = this.volumeLink(volIdx, volume);
        const chapters = volume.sortedChapters();
        const expand = chapters.length > 1 || volume.options.alwaysShowVolumeTitle || volume.options.createVolumePage;
        navPoints += `        <navPoint id="volume-${volIdx}" playOrder="${playOrder++}">
            <navLabel><text>${escapeXml(volume.title)}</text></navLabel>
            <content src="${link}"/>
`;
        if (expand) {
          for (const [chapIdx, chapter] of chapters) {
            navPoints += `            <navPoint id="chapter-${volIdx}-${chapIdx}" playOrder="${playOrder++}">
                <navLabel><text>${escapeXml(chapter.title)}</text></navLabel>
                <content src="Text/volume${volIdx}_chapter${chapIdx}.xhtml"/>
            </navPoint>
`;
          }
        }
        navPoints += `        </navPoint>
`;
      }
      return `<?xml version="1.0" encoding="UTF-8"?>
<ncx version="2005-1" xmlns="http://www.daisy.org/z3986/2005/ncx/">
    <head>
        <meta content="${escapeXml(uuid2)}" name="dtb:uid"/>
        <meta content="1" name="dtb:depth"/>
        <meta content="0" name="dtb:totalPageCount"/>
        <meta content="0" name="dtb:maxPageNumber"/>
    </head>
    <docTitle>
        <text>${escapeXml(title)}</text>
    </docTitle>
    <navMap>
${navPoints}    </navMap>
</ncx>`;
    }
    generateNavXhtml() {
      const title = this.meta("title", "Untitled Book");
      let navItems = "";
      if (this.coverBuffer) {
        navItems += `            <li><a href="Text/cover.xhtml">${escapeXml(this.t("cover"))}</a></li>
`;
      }
      for (const [volIdx, volume] of this.sortedVolumes()) {
        const link = this.volumeLink(volIdx, volume);
        const chapters = volume.sortedChapters();
        const expand = chapters.length > 1 || volume.options.alwaysShowVolumeTitle || volume.options.createVolumePage;
        if (!expand) {
          navItems += `            <li><a href="${link}">${escapeXml(volume.title)}</a></li>
`;
          continue;
        }
        navItems += `            <li>
                <a href="${link}">${escapeXml(volume.title)}</a>
                <ol>
`;
        for (const [chapIdx, chapter] of chapters) {
          navItems += `                    <li><a href="Text/volume${volIdx}_chapter${chapIdx}.xhtml">${escapeXml(chapter.title)}</a></li>
`;
        }
        navItems += `                </ol>
            </li>
`;
      }
      return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
    <head>
        <title>${escapeXml(title)} - ${escapeXml(this.t("tableOfContents"))}</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
    </head>
    <body>
        <nav epub:type="toc" id="toc">
            <h1>${escapeXml(this.t("tableOfContents"))}</h1>
            <ol>
${navItems}            </ol>
        </nav>
    </body>
</html>`;
    }
    generateCoverXhtml() {
      if (!this.coverBuffer) return "";
      const title = this.meta("title", "Untitled Book");
      return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>${escapeXml(title)} - ${escapeXml(this.t("cover"))}</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
        <style type="text/css">
            body { margin: 0; padding: 0; text-align: center; }
            .cover { width: 100%; height: 100vh; object-fit: contain; }
        </style>
    </head>
    <body>
        <img src="../Images/cover.${this.coverExtension}" alt="${escapeXml(this.t("cover"))}" class="cover"/>
    </body>
</html>`;
    }
    generateVolumePageXhtml(volume, volIdx) {
      let cssLinks = "";
      if (this.cssFiles.has(0)) {
        cssLinks += `        <link rel="stylesheet" type="text/css" href="../Styles/style0.css"/>
`;
      }
      let bodyContent = `        <h1>${escapeXml(volume.title)}</h1>
`;
      if (volume.options.volumePageType === "navigator") {
        const chapters = volume.sortedChapters();
        if (chapters.length > 0) {
          bodyContent += `        <h2>${escapeXml(this.t("chapters"))}</h2>
        <ul>
`;
          for (const [chapIdx, chapter] of chapters) {
            bodyContent += `            <li><a href="volume${volIdx}_chapter${chapIdx}.xhtml">${escapeXml(chapter.title)}</a></li>
`;
          }
          bodyContent += `        </ul>
`;
        }
      }
      return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>${escapeXml(volume.title)}</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
${cssLinks}    </head>
    <body>
${bodyContent}    </body>
</html>`;
    }
    /** 给 head 补 title / viewport / 样式引用，并按需插入正文标题 */
    decorateChapterDoc(doc, chapter) {
      let head = doc.querySelector("head");
      if (!head) {
        head = doc.createElement("head");
        doc.documentElement.insertBefore(head, doc.body);
      }
      if (!head.querySelector("title")) {
        const titleElement = doc.createElement("title");
        titleElement.textContent = chapter.title;
        head.insertBefore(titleElement, head.firstChild);
      }
      if (!head.querySelector('meta[name="viewport"]')) {
        const viewportMeta = doc.createElement("meta");
        viewportMeta.setAttribute("name", "viewport");
        viewportMeta.setAttribute("content", "width=device-width, height=device-height, initial-scale=1.0");
        head.appendChild(viewportMeta);
      }
      const linkCss = (idx) => {
        const href = `../Styles/style${idx}.css`;
        if (!this.cssFiles.has(idx) || head.querySelector(`link[href="${href}"]`)) return;
        const cssLink = doc.createElement("link");
        cssLink.setAttribute("rel", "stylesheet");
        cssLink.setAttribute("type", "text/css");
        cssLink.setAttribute("href", href);
        head.appendChild(cssLink);
      };
      if (chapter.useGlobalCSS) linkCss(0);
      for (const cssIdx of chapter.cssIdxs) linkCss(cssIdx);
      const body = doc.querySelector("body");
      if (body && chapter.insertTitle !== false) {
        const hasHeading = Boolean(body.querySelector("h1, h2, h3, h4, h5, h6"));
        if (chapter.insertTitle === true || !hasHeading) {
          const chapterHeading = doc.createElement("h2");
          chapterHeading.textContent = chapter.title;
          body.insertBefore(chapterHeading, body.firstChild);
        }
      }
    }
    static finalizeXhtml(serialized) {
      let result = serialized;
      if (!result.startsWith("<?xml")) {
        result = '<?xml version="1.0" encoding="UTF-8"?>\n' + result;
      }
      result = result.replace(/<html\b[^>]*>/i, (tag) => {
        let seen = false;
        const deduped = tag.replace(/\s+xmlns="[^"]*"/g, (match) => {
          if (seen) return "";
          seen = true;
          return match;
        });
        return seen ? deduped : deduped.replace(/^<html/i, '<html xmlns="http://www.w3.org/1999/xhtml"');
      });
      return result;
    }
    /**
     * html / xhtml 章节。内容可以是完整文档，也可以是片段。
     *
     * 片段必须先包成文档再解析：直接用 DOMParser 解析片段的话，
     * 第一个元素会被当成根元素，后面的兄弟节点全部塞进它内部，
     * 正文会整段错位（番茄的正文片段以 <p class="volumePicture"> 或
     * <h1 class="chapterTitle1"> 开头，症状就是所有段落跑进标题里）。
     */
    generateHtmlChapter(chapter) {
      const isDocument = /<html[\s>]/i.test(chapter.content);
      const source = isDocument ? chapter.content : `<html><head></head><body>${chapter.content}</body></html>`;
      try {
        const parser = new DOMParser();
        const xdoc = parser.parseFromString(source, "application/xhtml+xml");
        const doc = xdoc.querySelector("parsererror") ? parser.parseFromString(source, "text/html") : xdoc;
        this.decorateChapterDoc(doc, chapter);
        const serialized = new XMLSerializer().serializeToString(doc.documentElement);
        return _EpubSaver.finalizeXhtml(serialized);
      } catch (error) {
        console.warn("Failed to parse XHTML content:", error);
        return chapter.content;
      }
    }
    generateChapterXhtml(chapter) {
      if (chapter.type === "text") {
        let cssLinks = "";
        if (chapter.useGlobalCSS && this.cssFiles.has(0)) {
          cssLinks += `        <link rel="stylesheet" type="text/css" href="../Styles/style0.css"/>
`;
        }
        for (const cssIdx of chapter.cssIdxs) {
          if (cssIdx !== 0 && this.cssFiles.has(cssIdx)) {
            cssLinks += `        <link rel="stylesheet" type="text/css" href="../Styles/style${cssIdx}.css"/>
`;
          }
        }
        const bodyContent = `        <p>${escapeXml(chapter.content).replace(/\n\n/g, "</p>\n        <p>").replace(/\n/g, "<br/>")}</p>`;
        return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>${escapeXml(chapter.title)}</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
${cssLinks}    </head>
    <body>
        <h1>${escapeXml(chapter.title)}</h1>
${bodyContent}
    </body>
</html>`;
      }
      return this.generateHtmlChapter(chapter);
    }
    /**
     * 打包，返回 EPUB 字节。
     *
     * 章节 XHTML 是在这里生成的（每章一次 DOMParser + XMLSerializer），
     * 长篇小说上千章就是几十秒的同步计算。全部一口气跑完的话主线程被占死：
     * 界面停在 0% 不动，取消按钮的点击事件也排不进事件循环。
     * 所以按批生成、批间让出主线程，并在批之间检查取消。
     */
    async save(options = {}) {
      const { onWrite, onCompress, checkCancel } = options;
      const WRITE_BATCH = 20;
      this.zip.file("mimetype", "application/epub+zip", { compression: "STORE" });
      this.zip.folder("META-INF");
      this.zip.folder("OEBPS");
      this.zip.folder("OEBPS/Text");
      this.zip.folder("OEBPS/Styles");
      this.zip.folder("OEBPS/Images");
      const opts = {
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
      };
      this.zip.file("META-INF/container.xml", this.generateContainer(), opts);
      const tMeta = Date.now();
      this.zip.file("OEBPS/content.opf", this.generateContentOpf(), opts);
      this.zip.file("OEBPS/toc.ncx", this.generateTocNcx(), opts);
      this.zip.file("OEBPS/nav.xhtml", this.generateNavXhtml(), opts);
      console.log(`[epub] 目录/清单生成完毕，用时 ${Date.now() - tMeta}ms`);
      if (this.coverBuffer) {
        this.zip.file(`OEBPS/Images/cover.${this.coverExtension}`, this.coverBuffer, opts);
        this.zip.file("OEBPS/Text/cover.xhtml", this.generateCoverXhtml(), opts);
      }
      for (const [filename, imageData] of this.images) {
        this.zip.file(`OEBPS/Images/${filename}`, imageData.buffer, opts);
      }
      for (const [idx, cssData] of this.cssFiles) {
        this.zip.file(`OEBPS/Styles/style${idx}.css`, cssData.content, opts);
      }
      for (const [path, content] of this.cssMap) {
        this.zip.file(`OEBPS/Styles/${path}`, content, opts);
      }
      const total = Array.from(this.volumes.values()).reduce((sum, v) => sum + v.size + (v.options.createVolumePage ? 1 : 0), 0);
      let written = 0;
      onWrite == null ? void 0 : onWrite(0, total);
      console.log(`[epub] 开始写入 ${total} 个章节文件`);
      for (const [volIdx, volume] of this.sortedVolumes()) {
        if (volume.options.createVolumePage) {
          this.zip.file(
            `OEBPS/Text/volume${volIdx}_index.xhtml`,
            this.generateVolumePageXhtml(volume, volIdx),
            opts
          );
          written++;
        }
        for (const [chapIdx, chapter] of volume.sortedChapters()) {
          try {
            this.zip.file(
              `OEBPS/Text/volume${volIdx}_chapter${chapIdx}.xhtml`,
              this.generateChapterXhtml(chapter),
              opts
            );
          } catch (err) {
            console.error(
              `[epub] 第 ${chapIdx} 章「${chapter.title}」生成失败，用占位内容替代:`,
              err
            );
            this.zip.file(
              `OEBPS/Text/volume${volIdx}_chapter${chapIdx}.xhtml`,
              `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"><head><title>${escapeXml(chapter.title)}</title></head><body><h1>${escapeXml(chapter.title)}</h1><p>本章生成失败</p></body></html>`,
              opts
            );
          }
          written++;
          if (written % WRITE_BATCH === 0) {
            onWrite == null ? void 0 : onWrite(written, total);
            await yieldFrame();
            checkCancel == null ? void 0 : checkCancel();
          }
        }
      }
      onWrite == null ? void 0 : onWrite(written, total);
      checkCancel == null ? void 0 : checkCancel();
      console.log(`[epub] 章节写入完成 ${written}/${total}，条目总数 ${Object.keys(this.zip.files).length}，开始压缩`);
      const COMPRESS_TIMEOUT = 12e4;
      const t0 = Date.now();
      let lastPercent = -1;
      let cancelled = null;
      const compressing = this.zip.generateAsync({ type: "uint8array" }, (metadata) => {
        if (lastPercent < 0) {
          console.log(`[epub] 压缩开始，首次回调用时 ${Date.now() - t0}ms`);
        }
        lastPercent = metadata.percent;
        try {
          checkCancel == null ? void 0 : checkCancel();
        } catch (err) {
          cancelled = err;
        }
        try {
          onCompress == null ? void 0 : onCompress(metadata.percent, metadata.currentFile);
        } catch (err) {
          console.warn("[epub] 压缩进度回调异常:", err);
        }
      });
      let timer;
      const guard = new Promise((_, reject) => {
        timer = setTimeout(() => {
          reject(new Error(
            `压缩超时（${COMPRESS_TIMEOUT / 1e3}s 无进展，最后进度 ${lastPercent < 0 ? "未开始" : lastPercent.toFixed(1) + "%"}）。JSZip 的异步调度可能被页面环境干扰，请把控制台日志反馈给作者。`
          ));
        }, COMPRESS_TIMEOUT);
      });
      try {
        const out = await Promise.race([compressing, guard]);
        if (cancelled) throw cancelled;
        console.log(`[epub] 压缩完成：${out.length} 字节，用时 ${Date.now() - t0}ms`);
        return out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength);
      } finally {
        if (timer) clearTimeout(timer);
      }
    }
  };
  __publicField(_EpubSaver, "version", "1.0.3");
  let EpubSaver = _EpubSaver;
  class EpubVolume {
    constructor(idx, title, saver, options = {}) {
      __publicField(this, "idx");
      __publicField(this, "title");
      __publicField(this, "options");
      __publicField(this, "saver");
      __publicField(this, "chapters", /* @__PURE__ */ new Map());
      this.idx = idx;
      this.title = title;
      this.saver = saver;
      this.options = {
        alwaysShowVolumeTitle: false,
        createVolumePage: false,
        volumePageType: "navigator",
        ...options
      };
    }
    get size() {
      return this.chapters.size;
    }
    sortedChapters() {
      return Array.from(this.chapters.entries()).sort(([a], [b]) => a - b);
    }
    async addChapter(idx, title, content, type = "text", useGlobalCSS = false, cssIdxs = [], insertTitle) {
      let processedContent = content;
      if (type === "html" || type === "xhtml") {
        processedContent = await this.saver.processCSSLinksInContent(content);
        processedContent = await this.saver.downloadImagesFromContent(processedContent);
      }
      this.chapters.set(idx, {
        title,
        content: processedContent,
        type,
        useGlobalCSS,
        cssIdxs,
        insertTitle
      });
    }
  }
  const appcss = "/* \r\n * 番茄小说APP内置CSS\r\n * 版权归属为番茄小说APP官方\r\n * 修改以兼容网页环境\r\n *\r\n * line-space / theme-color 是 APP 排版引擎的私有属性，浏览器和 EPUB 阅读器都不认，\r\n * 已注释保留以便和原始样式对照。theme-color 的值 color1#0.7 还会让 CSS 解析器跑偏，\r\n * 把后面几条声明一起吃掉，必须注释而不能留着。\r\n */\r\n\r\nhtml{\r\n    display:block;\r\n}\r\n\r\nbody{\r\n    display:block;\r\n}\r\n\r\np{\r\n    font-size:1em;\r\n    text-align:justify;\r\n    display:block;\r\n    text-indent:2em;\r\n    margin:0.6em 0em 0.6em 0em;\r\n}\r\n\r\ndiv{\r\n    display:block;\r\n}\r\n\r\nh1{\r\n    display:block;\r\n    font-size:1.42em;\r\n    font-weight:bold;\r\n    margin:22px 0em 3em 0em;\r\n    text-align:left;\r\n    /* line-space:0.5em; */\r\n}\r\n\r\nh2{\r\n    display:block;\r\n    font-size:1.2em;\r\n    font-weight:bold;\r\n    margin:1em 0em 0.6em 0em;\r\n    text-align:left;\r\n}\r\n\r\nh3{\r\n    display:block;\r\n    font-size:1em;\r\n    font-weight:bold;\r\n    margin:0em 0em 1em 0em;\r\n    text-align:left;\r\n}\r\n\r\nsup{\r\n    font-size:smaller;\r\n}\r\n\r\n.picture{\r\n    text-indent:0em;\r\n    text-align:center;\r\n    margin:0em 0em 0em 0em;\r\n    /* line-space:0em; */\r\n}\r\n\r\n.pictureDesc{\r\n    font-size:0.73em;\r\n    text-indent:0em;\r\n    margin:0.4em 0em 1em 0em;\r\n    /* theme-color:color1#0.7; */\r\n    /* line-space:0.3em; */\r\n    text-align:left;\r\n}\r\n\r\n.pictureTitle{\r\n    font-size:0.73em;\r\n    text-indent:0em;\r\n    margin:1em 0em 0.3em 0em;\r\n    /* theme-color:color1#0.7; */\r\n    text-align:left;\r\n    /* line-space:0em; */\r\n}\r\n\r\n.collectTitle{\r\n    margin:80px 68px 0em 0px;\r\n    font-size:1.42em;\r\n    text-indent:0em;\r\n    text-align:left;\r\n}\r\n\r\n.collectAuthor{\r\n    margin:16px 0em 0em 0em;\r\n    font-size:1em;\r\n    text-indent:0em;\r\n    text-align:left;\r\n}\r\n\r\n.collectPicture{\r\n    margin:24px 0em 0em 0em;\r\n    text-indent:0em;\r\n    text-align:right;\r\n}\r\n\r\n.collectDetail{\r\n    margin:3em 44px 0em 10px;\r\n    text-indent:0em;\r\n}\r\n\r\n.quoteDefault{\r\n    font-size:1em;\r\n    margin:1.5em 0em 1.5em 2em;\r\n    font-family:'FZShengShiKaiShuS-M-GB';\r\n    /* line-space:0.5em; */\r\n}\r\n\r\n.quoteStyle1{\r\n    text-indent:0em;\r\n    text-align:left;\r\n}\r\n\r\n.alignRight{\r\n    text-align:right;\r\n}\r\n\r\n.quoteDefaultAlignRight{\r\n    font-size:1em;\r\n    margin:0.6em 0em 1.5em 32px;\r\n    font-family:'FZShengShiKaiShuS-M-GB';\r\n    text-align:right;\r\n    /* line-space:0.5em; */\r\n}\r\n.chapterTitle1{\r\n    display:block;\r\n    font-size:1.42em;\r\n    font-weight:bold;\r\n    margin:22px 0em 3em 0em;\r\n    text-align:left;\r\n    /* line-space:0.5em; */\r\n}\r\n\r\n.chapterTitle2{\r\n    display:block;\r\n    font-size:1.2em;\r\n    font-weight:bold;\r\n    margin:1em 0em 0.6em 0em;\r\n    text-align:left;\r\n}\r\n\r\n.chapterTitle3{\r\n    display:block;\r\n    font-size:1em;\r\n    font-weight:bold;\r\n    margin:0em 0em 1em 0em;\r\n    text-align:left;\r\n}\r\n\r\n.bdFootnote{\r\n    width:0.69em;\r\n    height:0.84em;\r\n    margin-top:-0.23em;\r\n    vertical-align:top;\r\n}\r\n\r\n.bdPicturebg{\r\n    break-before:always;\r\n}";
  const TITLE_CLASS = /(^|\s)chapterTitle\d?(\s|$)/;
  function normalizeTitle(text) {
    return text.replace(/[\s​‌‍﻿]+/g, "");
  }
  function parseChapterDoc(xhtml) {
    const parser = new DOMParser();
    const xdoc = parser.parseFromString(xhtml, "application/xhtml+xml");
    if (!xdoc.querySelector("parsererror") && xdoc.body) return xdoc;
    const hdoc = parser.parseFromString(xhtml, "text/html");
    return hdoc.body ? hdoc : null;
  }
  function contentRoot(doc) {
    return doc.querySelector("article") ?? doc.body;
  }
  function removeLeadingTitle(root, title) {
    const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const wanted = normalizeTitle(title);
    let index = 0;
    for (const heading of headings) {
      if (index++ >= 2) break;
      const cls = heading.getAttribute("class") ?? "";
      if (TITLE_CLASS.test(cls) || normalizeTitle(heading.textContent ?? "") === wanted) {
        heading.remove();
        return;
      }
    }
  }
  function takeStyles(doc) {
    const styles = [];
    doc.querySelectorAll("style").forEach((el) => {
      var _a;
      const text = (_a = el.textContent) == null ? void 0 : _a.trim();
      if (text) styles.push(text);
      el.remove();
    });
    return styles;
  }
  function chapterBody(raw) {
    var _a;
    if (typeof raw !== "string" || !raw.trim()) {
      return { html: "<p>正文内容为空</p>", styles: [] };
    }
    const doc = parseChapterDoc(raw);
    if (!doc) return { html: raw, styles: [] };
    const styles = takeStyles(doc);
    doc.querySelectorAll("link").forEach((el) => el.remove());
    const root = contentRoot(doc);
    const html = (_a = root == null ? void 0 : root.innerHTML) == null ? void 0 : _a.trim();
    return { html: html || "<p>正文内容为空</p>", styles };
  }
  function collectText(node, out) {
    var _a;
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = (_a = child.textContent) == null ? void 0 : _a.trim();
        if (text) out.push(text);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        collectText(child, out);
      }
    }
  }
  function chapterParagraphs(raw, title = "") {
    if (typeof raw !== "string" || !raw.trim()) return [];
    const doc = parseChapterDoc(raw);
    if (!doc) return [];
    takeStyles(doc);
    doc.querySelectorAll("script, link").forEach((el) => el.remove());
    const root = contentRoot(doc);
    if (!root) return [];
    if (title) removeLeadingTitle(root, title);
    const out = [];
    collectText(root, out);
    return out;
  }
  const FEEDBACK_HINT = /，如有任何疑问，请通过[“"]?我的-意见反馈[”"]?告知我们/;
  function parseJsonField(raw, fallback) {
    if (raw == null) return fallback;
    if (typeof raw !== "string") return raw ?? fallback;
    try {
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch {
      return fallback;
    }
  }
  function hdCover(url) {
    if (!url) return "";
    if (url.includes("novel-pic-r")) return url;
    let u = url;
    if (u.startsWith("https://")) u = u.substring(8);
    else if (u.startsWith("http://")) u = u.substring(7);
    const parts = u.split("/");
    parts[0] = "https://p6-novel.byteimg.com/origin";
    return parts.map((part) => part.includes("?") || part.includes("~") ? part.split("~")[0] : part).join("/");
  }
  function toBookMeta(raw) {
    const categories = parseJsonField(raw == null ? void 0 : raw.category_v2, []).map((item) => String((item == null ? void 0 : item.Name) ?? "")).filter(Boolean);
    return {
      book_id: String((raw == null ? void 0 : raw.book_id) ?? ""),
      title: String((raw == null ? void 0 : raw.book_name) || (raw == null ? void 0 : raw.original_book_name) || "未命名"),
      author: String((raw == null ? void 0 : raw.author) ?? "未知作者"),
      categories: categories.length ? categories : [String((raw == null ? void 0 : raw.category) ?? "")].filter(Boolean),
      roles: parseJsonField(raw == null ? void 0 : raw.roles, []).map(String).filter(Boolean),
      abstract: String((raw == null ? void 0 : raw.abstract) ?? ""),
      copyright: String((raw == null ? void 0 : raw.copyright_info) ?? "").replace(FEEDBACK_HINT, ""),
      cover_url: String((raw == null ? void 0 : raw.thumb_url) ?? ""),
      word_number: Number(raw == null ? void 0 : raw.word_number) || 0,
      creation_status: String((raw == null ? void 0 : raw.creation_status) ?? "")
    };
  }
  function describeBook(meta) {
    const lines = [];
    if (meta.categories.length) lines.push(`分类：${meta.categories.join("、")}`);
    if (meta.roles.length) lines.push(`主角：${meta.roles.join("、")}`);
    if (meta.abstract) lines.push(`简介：${meta.abstract}`);
    if (meta.copyright) lines.push(`${meta.copyright}。`);
    return lines.join("\n");
  }
  const CSS_CDN_PREFIX = "https://p3-novel.byteimg.com/origin/";
  const INLINE_CSS_BASE = 1;
  async function buildEpub({
    meta,
    catalog,
    chapters,
    cssMap,
    task
  }) {
    var _a;
    const saver = new EpubSaver({
      // 部分图床不给 CORS 头，走项目的双通道实现
      fetchBinary: fetchArrayBuffer,
      fetchText: async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      },
      // 关掉插图下载时保留原地址，联网仍能看，比直接删掉损失小
      images: settings$1.downloadImages ? "download" : "keep"
    });
    saver.setInfo("title", meta.title);
    saver.setInfo("language", "zh-CN");
    saver.setInfo("creator", meta.author);
    saver.setInfo("description", describeBook(meta));
    saver.setInfo("publisher", "番茄小说");
    task.stage("准备 EPUB…", 1);
    if (meta.cover_url) {
      try {
        await saver.cover(hdCover(meta.cover_url));
      } catch (err) {
        console.warn("[fqa:download] 封面下载失败，跳过:", err);
      }
    }
    task.update(1);
    await saver.addCSS(0, appcss, "Styles/dragon-common.css");
    if (settings$1.downloadBookCss) {
      const map = parseCssMap(cssMap);
      const absolute = {};
      for (const [path, uri] of Object.entries(map)) {
        if (uri) absolute[path] = CSS_CDN_PREFIX + uri;
      }
      if (Object.keys(absolute).length) {
        try {
          await saver.addCSSMap(absolute);
        } catch (err) {
          console.warn("[fqa:download] 书籍样式获取失败，跳过:", err);
        }
      }
    }
    task.stage("组装章节…", catalog.length);
    const styleIndex = /* @__PURE__ */ new Map();
    let nextCssIdx = INLINE_CSS_BASE;
    let volumeName = "";
    let volumeIdx = 0;
    let currentVolume = null;
    let cursor = 0;
    for (const item of catalog) {
      task.throwIfCancelled();
      const chapter = chapters[item.item_id];
      const name2 = ((_a = chapter == null ? void 0 : chapter.novel_data) == null ? void 0 : _a.volume_name) || item.volume_title || "默认卷";
      if (!currentVolume || name2 !== volumeName) {
        volumeName = name2;
        currentVolume = await saver.addVolume(volumeIdx++, name2, {
          createVolumePage: settings$1.downloadVolumePage,
          volumePageType: "blank"
        });
      }
      const { html, styles } = chapterBody(chapter == null ? void 0 : chapter.content);
      const cssIdxs = [];
      for (const style of styles) {
        let idx = styleIndex.get(style);
        if (idx === void 0) {
          idx = nextCssIdx++;
          styleIndex.set(style, idx);
          await saver.addCSS(idx, style);
        }
        cssIdxs.push(idx);
      }
      await currentVolume.addChapter(
        cursor++,
        item.title,
        html,
        "html",
        true,
        cssIdxs,
        // 正文自带标题元素，不要再插一个
        false
      );
      task.update(cursor, item.title);
      if (cursor % 20 === 0) await nextFrame();
    }
    console.log(`[fqa:download] 章节内联样式去重后 ${styleIndex.size} 份`);
    task.stage("写入章节…", catalog.length);
    let lastPercent = -1;
    const buffer = await saver.save({
      onWrite: (done, total) => {
        if (total !== task.snapshot.total) task.setTotal(total);
        task.update(done);
      },
      onCompress: (percent, currentFile) => {
        const rounded = Math.floor(percent);
        if (rounded === lastPercent) return;
        if (lastPercent < 0) task.stagePercent("压缩 EPUB…");
        lastPercent = rounded;
        task.update(rounded, currentFile ?? "正在压缩…");
      },
      checkCancel: () => task.throwIfCancelled()
    });
    task.update(100, "");
    return new Blob([buffer], { type: "application/epub+zip" });
  }
  const ILLEGAL = /[\\/:*?"<>|\r\n\t]/g;
  function sanitizeFilename(name2, fallback = "download") {
    const cleaned = name2.replace(ILLEGAL, "_").replace(/[. ]+$/, "").trim();
    if (!cleaned) return fallback;
    return cleaned.length > 120 ? cleaned.slice(0, 120) : cleaned;
  }
  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3e4);
  }
  const GBK_RANGES = [
    [161, 169, 161, 254],
    [176, 247, 161, 254],
    [129, 160, 64, 254],
    [170, 254, 64, 160],
    [168, 169, 64, 160],
    [170, 175, 161, 254],
    [248, 254, 161, 254],
    [161, 167, 64, 160]
  ];
  let table = null;
  function initTable() {
    const pairs = new Uint16Array(23940);
    let count = 0;
    for (const [hiStart, hiEnd, loStart, loEnd] of GBK_RANGES) {
      for (let lo = loStart; lo <= loEnd; lo++) {
        if (lo === 127) continue;
        for (let hi = hiStart; hi <= hiEnd; hi++) {
          pairs[count++] = lo << 8 | hi;
        }
      }
    }
    const next = new Uint16Array(65536).fill(65535);
    const decoded = new TextDecoder("gbk").decode(pairs);
    for (let i2 = 0; i2 < decoded.length; i2++) {
      next[decoded.charCodeAt(i2)] = pairs[i2];
    }
    table = next;
    return next;
  }
  function encodeGBK(text, options = {}) {
    const map = table ?? initTable();
    const onError = options.onError ?? (() => 63);
    const out = new Uint8Array(text.length * 2);
    let n = 0;
    for (let i2 = 0; i2 < text.length; i2++) {
      const code = text.charCodeAt(i2);
      if (code < 128) {
        out[n++] = code;
        continue;
      }
      const gbk = map[code];
      if (gbk !== 65535) {
        out[n++] = gbk & 255;
        out[n++] = gbk >> 8;
        continue;
      }
      if (code === 8364) {
        out[n++] = 128;
        continue;
      }
      const replacement = onError(i2, text);
      if (replacement === -1) break;
      if (replacement > 255) {
        out[n++] = replacement & 255;
        out[n++] = replacement >> 8;
      } else {
        out[n++] = replacement;
      }
    }
    return out.subarray(0, n);
  }
  const INDENT = "　　";
  async function buildTxtContent({
    meta,
    catalog,
    chapters,
    task
  }) {
    var _a;
    task.stage("处理章节…", catalog.length);
    const parts = [meta.title, `作者：${meta.author}`, describeBook(meta), "", ""];
    let volumeName = "";
    let cursor = 0;
    for (const item of catalog) {
      task.throwIfCancelled();
      const chapter = chapters[item.item_id];
      const name2 = ((_a = chapter == null ? void 0 : chapter.novel_data) == null ? void 0 : _a.volume_name) || item.volume_title || "";
      if (name2 && name2 !== volumeName) {
        volumeName = name2;
        parts.push(`
${name2.replace("：默认", "")}
`);
      }
      const paragraphs = chapterParagraphs(chapter == null ? void 0 : chapter.content, item.title);
      const body = paragraphs.length ? INDENT + paragraphs.join(`
${INDENT}`) : `${INDENT}（本章内容缺失）`;
      parts.push(`${item.title}
${body}

`);
      task.update(++cursor, item.title);
      if (cursor % 50 === 0) await nextFrame();
    }
    return parts.join("\n");
  }
  function txtToBlob(content) {
    const charset = settings$1.downloadCharset;
    const encoded = charset === "gbk" ? encodeGBK(content) : new TextEncoder().encode(content);
    return new Blob([encoded], { type: `text/plain;charset=${charset}` });
  }
  let activeTask = null;
  let running = false;
  const taskListeners = /* @__PURE__ */ new Set();
  function onTaskChange(listener) {
    taskListeners.add(listener);
    listener(activeTask);
    return () => taskListeners.delete(listener);
  }
  function setActiveTask(task) {
    activeTask = task;
    for (const listener of taskListeners) {
      try {
        listener(task);
      } catch (err) {
        console.error("[fqa:download] 任务监听异常:", err);
      }
    }
  }
  function clearFinishedTask() {
    if (!activeTask) return;
    if (!activeTask.snapshot.done) activeTask.cancel();
    setActiveTask(null);
  }
  function findCssMap(chapters) {
    var _a;
    for (const chapter of Object.values(chapters)) {
      const cssMap = (_a = chapter.novel_data) == null ? void 0 : _a.css_map;
      if (cssMap) return cssMap;
    }
    return void 0;
  }
  async function resolveMeta(bookId2, chapters) {
    var _a;
    try {
      const raw = await getBookInfoRaw(bookId2);
      if (raw == null ? void 0 : raw.book_id) return toBookMeta(raw);
    } catch (err) {
      console.warn("[fqa:download] 获取书籍详情失败，改用章节里的信息:", err);
    }
    const fallback = (_a = Object.values(chapters).find((c) => {
      var _a2;
      return (_a2 = c.novel_data) == null ? void 0 : _a2.book_id;
    })) == null ? void 0 : _a.novel_data;
    return toBookMeta(fallback ?? { book_id: bookId2 });
  }
  async function startDownload(bookId2, options = {}) {
    if (running) {
      console.warn("[fqa:download] 已有下载任务在进行");
      return;
    }
    const format = options.format ?? settings$1.downloadFormat;
    const task = new DownloadTask();
    running = true;
    setActiveTask(task);
    try {
      task.stage("获取目录…");
      const catalogResult = await getCatalog(bookId2);
      const catalog = catalogResult.chapter_list;
      if (catalog.length === 0) throw new Error("目录为空");
      task.throwIfCancelled();
      const titleMap = new Map(catalog.map((item) => [item.item_id, item.title]));
      const { chapters, failed } = await fetchChapters(
        catalog.map((item) => item.item_id),
        bookId2,
        task,
        { titleOf: (itemId2) => titleMap.get(itemId2) }
      );
      task.throwIfCancelled();
      if (Object.keys(chapters).length === 0) {
        throw new Error("没有获取到任何章节正文");
      }
      if (failed.length > 0) {
        console.warn(`[fqa:download] ${failed.length} 章缺失，仍然继续导出`);
      }
      const meta = await resolveMeta(bookId2, chapters);
      task.throwIfCancelled();
      const base = sanitizeFilename(`${meta.title}_${meta.author}`, bookId2);
      if (format === "epub") {
        const blob = await buildEpub({
          meta,
          catalog,
          chapters,
          cssMap: findCssMap(chapters),
          task
        });
        task.stage("保存中…", 1);
        saveBlob(blob, `${base}.epub`);
      } else {
        const content = await buildTxtContent({ meta, catalog, chapters, task });
        task.stage("保存中…", 1);
        saveBlob(txtToBlob(content), `${base}.txt`);
      }
      task.update(1);
      task.finish(failed.length > 0 ? `完成（${failed.length} 章缺失）` : "下载完成");
    } catch (err) {
      if (err instanceof CancelledError) {
        console.log("[fqa:download] 任务已取消");
        task.finish("已取消");
        return;
      }
      console.error("[fqa:download] 下载失败:", err);
      task.fail(err);
    } finally {
      running = false;
    }
  }
  const _hoisted_1$4 = { id: "fqa-bookshelf" };
  const _hoisted_2$4 = { class: "fqa-bs-header" };
  const _hoisted_3$4 = { class: "fqa-bs-actions" };
  const _hoisted_4$4 = { key: 0 };
  const _hoisted_5$4 = ["disabled"];
  const _hoisted_6$4 = ["aria-selected", "onClick", "onKeydown"];
  const _hoisted_7$4 = { class: "fqa-tab-count" };
  const _hoisted_8$4 = {
    key: 0,
    class: "fqa-groupbar"
  };
  const _hoisted_9$4 = { class: "fqa-groupbar-name" };
  const _hoisted_10$4 = { class: "fqa-groupbar-count" };
  const _hoisted_11$3 = {
    key: 1,
    class: "fqa-status"
  };
  const _hoisted_12$3 = {
    key: 2,
    class: "fqa-status"
  };
  const _hoisted_13$3 = { class: "fqa-status-title" };
  const _hoisted_14$3 = { class: "fqa-grid" };
  const _hoisted_15$1 = {
    key: 0,
    class: "fqa-toast"
  };
  const HOVER_DELAY = 300;
  const HIDE_DELAY = 160;
  const HOVER_WIDTH = 280;
  const HOVER_GAP = 12;
  const VIEWPORT_MARGIN = 8;
  const MOVE_PREFIX = "move:";
  const DOWNLOAD_PREFIX$1 = "download:";
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookshelfView",
    setup(__props) {
      const { loading, detailLoading, error, counts, groups, load: load2, ensureDetails, cellsOf, findGroup, PAGE_SIZE: PAGE_SIZE2 } = useBookshelf();
      const activeTab = vue.ref("all");
      const openedGroupName = vue.ref(null);
      const tabsRef = vue.ref(null);
      const inkStyle = vue.ref({ left: "0px", width: "0px" });
      const hoverEntry = vue.ref(null);
      const hoverVisible = vue.ref(false);
      const hoverPos = vue.ref({ x: 0, y: 0 });
      const hoverHeight = vue.ref(0);
      let hoverTimer;
      let hideTimer;
      let hoverAnchor = null;
      const pointerInPanel = vue.ref(false);
      const openedGroup = vue.computed(
        () => openedGroupName.value ? findGroup(openedGroupName.value) : null
      );
      const allCells = vue.computed(() => {
        const group = openedGroup.value;
        if (group) {
          return group.books.map((entry) => ({
            kind: "book",
            key: `book:${entry.item.book_id}`,
            entry
          }));
        }
        return cellsOf(activeTab.value);
      });
      const visibleCount = vue.ref(PAGE_SIZE2);
      const cells = vue.computed(() => allCells.value.slice(0, visibleCount.value));
      const hasMore = vue.computed(() => visibleCount.value < allCells.value.length);
      const sentinel = vue.ref(null);
      let pageObserver = null;
      function resetPaging() {
        visibleCount.value = PAGE_SIZE2;
      }
      async function refresh() {
        resetPaging();
        await load2(true);
      }
      vue.watch([activeTab, openedGroupName], resetPaging);
      const isEmpty = vue.computed(() => !loading.value && !error.value && allCells.value.length === 0);
      const emptyText = vue.computed(() => {
        if (openedGroup.value) return "这个分组还没有书";
        if (activeTab.value === "group") return "还没有创建任何分组";
        if (activeTab.value === "publish") return "书架里还没有出版物";
        return "书架空空如也，去首页找几本书看看吧";
      });
      function updateInk() {
        const wrap = tabsRef.value;
        if (!wrap) return;
        const index = TABS.findIndex((tab) => tab.key === activeTab.value);
        const el = wrap.querySelectorAll(".fqa-tab")[index];
        if (!el) return;
        inkStyle.value = {
          left: `${el.offsetLeft}px`,
          width: `${el.offsetWidth}px`
        };
      }
      function selectTab(key) {
        openedGroupName.value = null;
        activeTab.value = key;
        hideHover(true);
      }
      vue.watch(activeTab, () => vue.nextTick(updateInk));
      vue.watch(counts, () => vue.nextTick(updateInk), { deep: true });
      function computePosition(el) {
        const cover = el.querySelector(".fqa-cover") ?? el;
        const rect = cover.getBoundingClientRect();
        let x = rect.right + HOVER_GAP;
        if (x + HOVER_WIDTH > window.innerWidth - VIEWPORT_MARGIN) {
          x = rect.left - HOVER_WIDTH - HOVER_GAP;
        }
        x = Math.max(VIEWPORT_MARGIN, Math.min(x, window.innerWidth - HOVER_WIDTH - VIEWPORT_MARGIN));
        const topLimit = VIEWPORT_MARGIN;
        const bottomLimit = window.innerHeight - VIEWPORT_MARGIN;
        const height = Math.min(rect.height, bottomLimit - topLimit);
        const y = Math.max(topLimit, Math.min(rect.top, bottomLimit - height));
        hoverHeight.value = height;
        hoverPos.value = { x, y };
      }
      function onCardHover({ entry, el }) {
        if (hoverTimer) clearTimeout(hoverTimer);
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = void 0;
        }
        if (!entry.detail) return;
        hoverAnchor = el;
        if (hoverVisible.value && hoverEntry.value !== entry) {
          computePosition(el);
          hoverEntry.value = entry;
          return;
        }
        hoverTimer = setTimeout(() => {
          hoverTimer = void 0;
          computePosition(el);
          hoverEntry.value = entry;
          hoverVisible.value = true;
        }, HOVER_DELAY);
      }
      function scheduleHide() {
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          hoverTimer = void 0;
        }
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          hideTimer = void 0;
          if (!pointerInPanel.value) hideHover(true);
        }, HIDE_DELAY);
      }
      function hideHover(immediate = false) {
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          hoverTimer = void 0;
        }
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = void 0;
        }
        pointerInPanel.value = false;
        hoverAnchor = null;
        hoverVisible.value = false;
        if (immediate) hoverEntry.value = null;
      }
      function onPanelEnter() {
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = void 0;
        }
        pointerInPanel.value = true;
      }
      function onPanelLeave() {
        pointerInPanel.value = false;
        scheduleHide();
      }
      let pendingItems = [];
      let flushTimer;
      function queueDetails(entries) {
        const pending = entries.filter((entry) => !entry.detail);
        if (!pending.length) return;
        pendingItems.push(...pending.map((entry) => entry.item));
        if (flushTimer) return;
        flushTimer = setTimeout(() => {
          flushTimer = void 0;
          const batch = pendingItems;
          pendingItems = [];
          void ensureDetails(batch);
        }, 50);
      }
      function onCardVisible(entry) {
        queueDetails([entry]);
      }
      function onGroupVisible(entries) {
        queueDetails(entries);
      }
      function continueReadingUrl(entry) {
        var _a;
        const chapterId = ((_a = entry.detail) == null ? void 0 : _a.current_chapter_id) || entry.item.last_read_chapter_id;
        return chapterId && chapterId !== "0" ? readerUrl(chapterId) : null;
      }
      function openBook({ entry, mods }) {
        hideHover(true);
        const wantRead = settings$1.bookshelfClickAction === "read" !== mods.flip;
        const url = wantRead && continueReadingUrl(entry) || bookPageUrl(entry.item.book_id);
        openUrl(url, mods.newTab);
      }
      function openGroup(group) {
        hideHover(true);
        openedGroupName.value = group.name;
      }
      const menuVisible = vue.ref(false);
      const menuPos = vue.ref({ x: 0, y: 0 });
      const menuEntry = vue.ref(null);
      const toast = vue.ref(null);
      let toastTimer;
      function showToast(msg) {
        toast.value = msg;
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.value = null;
          toastTimer = void 0;
        }, 2600);
      }
      const NO_GROUP_KEY = `${MOVE_PREFIX}`;
      const menuItems = vue.computed(() => {
        const entry = menuEntry.value;
        if (!entry) return [];
        const current = entry.item.group_name ?? "";
        const targets = groups.value.filter((g2) => g2.name !== current).map((g2) => ({ key: `${MOVE_PREFIX}${g2.name}`, label: g2.name }));
        if (current) targets.push({ key: NO_GROUP_KEY, label: "无分组" });
        const items = [
          { key: "read", label: "继续阅读" },
          { key: "detail", label: "查看详情" },
          {
            key: "move",
            label: "移动到分组",
            disabled: targets.length === 0,
            children: targets
          }
        ];
        if (settings$1.enableDownload) {
          items.push({
            key: "download",
            label: "下载",
            children: [
              { key: `${DOWNLOAD_PREFIX$1}epub`, label: "EPUB" },
              { key: `${DOWNLOAD_PREFIX$1}txt`, label: "TXT" }
            ]
          });
        }
        items.push({ key: "remove", label: "从书架删除", danger: true });
        return items;
      });
      function onCardContextMenu({ entry, x, y }) {
        hideHover(true);
        menuEntry.value = entry;
        menuPos.value = { x, y };
        menuVisible.value = true;
      }
      async function onMenuSelect(key) {
        var _a;
        const entry = menuEntry.value;
        if (!entry) return;
        const bookId2 = entry.item.book_id;
        if (key === "read") {
          openUrl(continueReadingUrl(entry) ?? bookPageUrl(bookId2));
          return;
        }
        if (key === "detail") {
          openUrl(bookPageUrl(bookId2));
          return;
        }
        if (key.startsWith(DOWNLOAD_PREFIX$1)) {
          const format = key.slice(DOWNLOAD_PREFIX$1.length);
          void startDownload(bookId2, { format });
          return;
        }
        if (key === "remove") {
          if (!unsafeWindow.confirm(`确定要把《${((_a = entry.detail) == null ? void 0 : _a.title) ?? bookId2}》从书架删除吗？`)) return;
          try {
            await removeFromBookshelf(bookId2);
            showToast("已从书架删除");
            await refresh();
          } catch (err) {
            console.error("[fqa:bookshelf] 删除失败:", err);
            showToast(err instanceof Error ? err.message : "删除失败");
          }
          return;
        }
        if (key.startsWith(MOVE_PREFIX)) {
          const groupName = key.slice(MOVE_PREFIX.length);
          try {
            await moveToGroup(bookId2, groupName);
            showToast(groupName ? `已移动到「${groupName}」` : "已移出分组");
            await refresh();
          } catch (err) {
            console.error("[fqa:bookshelf] 移动分组失败:", err);
            showToast(err instanceof Error ? err.message : "移动分组失败");
          }
        }
      }
      function backToList() {
        openedGroupName.value = null;
        hideHover(true);
      }
      function onScrollOrResize() {
        if (hoverAnchor && (hoverVisible.value || hoverTimer)) {
          if (hoverAnchor.isConnected) {
            computePosition(hoverAnchor);
          } else {
            hideHover(true);
          }
        }
        updateInk();
      }
      vue.onMounted(async () => {
        await load2();
        await vue.nextTick();
        updateInk();
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        if (typeof IntersectionObserver !== "undefined") {
          pageObserver = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting) && hasMore.value) {
                visibleCount.value += PAGE_SIZE2;
              }
            },
            { rootMargin: "400px" }
          );
          vue.watch(
            sentinel,
            (el) => {
              pageObserver == null ? void 0 : pageObserver.disconnect();
              if (el) pageObserver == null ? void 0 : pageObserver.observe(el);
            },
            { immediate: true }
          );
        }
      });
      vue.onBeforeUnmount(() => {
        if (hoverTimer) clearTimeout(hoverTimer);
        if (hideTimer) clearTimeout(hideTimer);
        if (flushTimer) clearTimeout(flushTimer);
        pageObserver == null ? void 0 : pageObserver.disconnect();
        pageObserver = null;
        window.removeEventListener("scroll", onScrollOrResize, true);
        window.removeEventListener("resize", onScrollOrResize);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          vue.createElementVNode("div", _hoisted_2$4, [
            _cache[1] || (_cache[1] = vue.createElementVNode("div", { class: "fqa-bs-title" }, "我的书架", -1)),
            vue.createElementVNode("div", _hoisted_3$4, [
              vue.unref(detailLoading) ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$4, "正在补全详情…")) : vue.createCommentVNode("", true),
              vue.createElementVNode("button", {
                class: "fqa-btn",
                disabled: vue.unref(loading),
                onClick: refresh
              }, vue.toDisplayString(vue.unref(loading) ? "刷新中…" : "刷新"), 9, _hoisted_5$4)
            ])
          ]),
          vue.createElementVNode("div", {
            ref_key: "tabsRef",
            ref: tabsRef,
            class: "fqa-tabs",
            role: "tablist"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(TABS), (tab) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: tab.key,
                class: vue.normalizeClass(["fqa-tab", { "fqa-tab-active": activeTab.value === tab.key }]),
                role: "tab",
                tabindex: "0",
                "aria-selected": activeTab.value === tab.key,
                onClick: ($event) => selectTab(tab.key),
                onKeydown: vue.withKeys(vue.withModifiers(($event) => selectTab(tab.key), ["prevent"]), ["enter"])
              }, [
                vue.createTextVNode(vue.toDisplayString(tab.label), 1),
                vue.createElementVNode("span", _hoisted_7$4, vue.toDisplayString(vue.unref(counts)[tab.key]), 1)
              ], 42, _hoisted_6$4);
            }), 128)),
            vue.createElementVNode("span", {
              class: "fqa-tab-ink",
              style: vue.normalizeStyle(inkStyle.value)
            }, null, 4)
          ], 512),
          openedGroup.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$4, [
            vue.createElementVNode("button", {
              class: "fqa-btn",
              onClick: backToList
            }, "← 返回"),
            vue.createElementVNode("span", _hoisted_9$4, vue.toDisplayString(openedGroup.value.name), 1),
            vue.createElementVNode("span", _hoisted_10$4, "共" + vue.toDisplayString(openedGroup.value.books.length) + "本书", 1)
          ])) : vue.createCommentVNode("", true),
          vue.unref(error) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$3, [
            _cache[2] || (_cache[2] = vue.createElementVNode("div", { class: "fqa-status-title" }, "书架加载失败", -1)),
            vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(error)), 1),
            vue.createElementVNode("button", {
              class: "fqa-btn",
              onClick: refresh
            }, "重试")
          ])) : isEmpty.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$3, [
            vue.createElementVNode("div", _hoisted_13$3, vue.toDisplayString(emptyText.value), 1)
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
            vue.createElementVNode("div", _hoisted_14$3, [
              vue.unref(loading) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(8, (n) => {
                return vue.createElementVNode("div", {
                  key: `sk-${n}`,
                  class: "fqa-card"
                }, [..._cache[3] || (_cache[3] = [
                  vue.createElementVNode("div", { class: "fqa-sk-cover fqa-sk-anim" }, null, -1),
                  vue.createElementVNode("div", {
                    class: "fqa-sk-line fqa-sk-anim",
                    style: { "width": "90%" }
                  }, null, -1),
                  vue.createElementVNode("div", {
                    class: "fqa-sk-line fqa-sk-anim",
                    style: { "width": "55%" }
                  }, null, -1)
                ])]);
              }), 64)) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(cells.value, (cell) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: cell.key
                }, [
                  cell.kind === "book" ? (vue.openBlock(), vue.createBlock(_sfc_main$8, {
                    key: 0,
                    entry: cell.entry,
                    onHover: onCardHover,
                    onLeave: scheduleHide,
                    onOpen: openBook,
                    onVisible: onCardVisible,
                    onContextmenu: onCardContextMenu
                  }, null, 8, ["entry"])) : (vue.openBlock(), vue.createBlock(_sfc_main$7, {
                    key: 1,
                    group: cell.group,
                    onOpen: openGroup,
                    onVisible: onGroupVisible
                  }, null, 8, ["group"]))
                ], 64);
              }), 128))
            ]),
            !vue.unref(loading) && hasMore.value ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              ref_key: "sentinel",
              ref: sentinel,
              class: "fqa-loadmore"
            }, "加载中…", 512)) : vue.createCommentVNode("", true)
          ], 64)),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
            vue.createVNode(_sfc_main$6, {
              entry: hoverEntry.value,
              x: hoverPos.value.x,
              y: hoverPos.value.y,
              height: hoverHeight.value,
              visible: hoverVisible.value,
              onPanelEnter,
              onPanelLeave
            }, null, 8, ["entry", "x", "y", "height", "visible"]),
            vue.createVNode(_sfc_main$5, {
              visible: menuVisible.value,
              x: menuPos.value.x,
              y: menuPos.value.y,
              items: menuItems.value,
              onSelect: onMenuSelect,
              onClose: _cache[0] || (_cache[0] = ($event) => menuVisible.value = false)
            }, null, 8, ["visible", "x", "y", "items"]),
            toast.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_15$1, vue.toDisplayString(toast.value), 1)) : vue.createCommentVNode("", true)
          ]))
        ]);
      };
    }
  });
  const bookshelfcss = "#fqa-bookshelf {\r\n    --fqa-text: #1f2329;\r\n    --fqa-text-sub: #646a73;\r\n    --fqa-text-weak: #8f959e;\r\n    --fqa-border: rgba(31, 35, 41, 0.08);\r\n    --fqa-hover: rgba(31, 35, 41, 0.04);\r\n    --fqa-accent: #ff6f3d;\r\n    --fqa-skeleton: rgba(31, 35, 41, 0.06);\r\n    --fqa-skeleton-hl: rgba(31, 35, 41, 0.12);\r\n    --fqa-shadow: 0 4px 16px rgba(31, 35, 41, 0.08);\r\n\r\n    display: block;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    max-width: 1100px;\r\n    margin: 0 auto;\r\n    /* 顶部留出原站 fixed 顶栏（80px）的高度，否则标题和 tab 会被压在下面 */\r\n    padding: calc(80px + 24px) 16px 64px;\r\n    color: var(--fqa-text);\r\n    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial,\r\n        sans-serif;\r\n}\r\n\r\n#fqa-bookshelf *,\r\n#fqa-bookshelf *::before,\r\n#fqa-bookshelf *::after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n#fqa-bookshelf div,\r\n#fqa-bookshelf span,\r\n#fqa-bookshelf h1,\r\n#fqa-bookshelf ul,\r\n#fqa-bookshelf li {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    list-style: none;\r\n    float: none;\r\n    position: static;\r\n}\r\n\r\n/* ------------------------------ 顶部 / Tabs ------------------------------ */\r\n\r\n#fqa-bookshelf .fqa-bs-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 16px;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n#fqa-bookshelf .fqa-bs-title {\r\n    font-size: 24px;\r\n    font-weight: 600;\r\n    line-height: 1.4;\r\n}\r\n\r\n#fqa-bookshelf .fqa-bs-actions {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    font-size: 13px;\r\n    color: var(--fqa-text-weak);\r\n}\r\n\r\n#fqa-bookshelf .fqa-btn {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    padding: 6px 14px;\r\n    border: 1px solid var(--fqa-border);\r\n    border-radius: 999px;\r\n    background: transparent;\r\n    color: var(--fqa-text-sub);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    line-height: 1.4;\r\n    cursor: pointer;\r\n    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;\r\n}\r\n\r\n#fqa-bookshelf .fqa-btn:hover:not(:disabled) {\r\n    border-color: var(--fqa-accent);\r\n    color: var(--fqa-accent);\r\n    background: rgba(255, 111, 61, 0.06);\r\n}\r\n\r\n#fqa-bookshelf .fqa-btn:disabled {\r\n    opacity: 0.5;\r\n    cursor: default;\r\n}\r\n\r\n#fqa-bookshelf .fqa-tabs {\r\n    position: relative;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    margin-bottom: 24px;\r\n    border-bottom: 1px solid var(--fqa-border);\r\n}\r\n\r\n#fqa-bookshelf .fqa-tab {\r\n    padding: 10px 16px;\r\n    color: var(--fqa-text-sub);\r\n    font-size: 15px;\r\n    line-height: 22px;\r\n    cursor: pointer;\r\n    user-select: none;\r\n    transition: color 0.15s ease;\r\n}\r\n\r\n#fqa-bookshelf .fqa-tab:hover {\r\n    color: var(--fqa-text);\r\n}\r\n\r\n#fqa-bookshelf .fqa-tab-active {\r\n    color: var(--fqa-accent);\r\n    font-weight: 600;\r\n}\r\n\r\n#fqa-bookshelf .fqa-tab-count {\r\n    margin-left: 4px;\r\n    font-size: 12px;\r\n    font-weight: 400;\r\n    color: var(--fqa-text-weak);\r\n}\r\n\r\n#fqa-bookshelf .fqa-tab-ink {\r\n    position: absolute;\r\n    bottom: -1px;\r\n    left: 0;\r\n    width: 0;\r\n    height: 2px;\r\n    border-radius: 2px;\r\n    background: var(--fqa-accent);\r\n    transition: left 0.25s ease, width 0.25s ease;\r\n}\r\n\r\n/* ------------------------------- 书架网格 ------------------------------- */\r\n\r\n/* 原站一排最多 4 本；窄屏逐级降到 3 / 2 */\r\n#fqa-bookshelf .fqa-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, minmax(0, 1fr));\r\n    gap: 28px 24px;\r\n    align-items: start;\r\n}\r\n\r\n@media (max-width: 900px) {\r\n    #fqa-bookshelf .fqa-grid {\r\n        grid-template-columns: repeat(3, minmax(0, 1fr));\r\n    }\r\n}\r\n\r\n@media (max-width: 600px) {\r\n    #fqa-bookshelf .fqa-grid {\r\n        grid-template-columns: repeat(2, minmax(0, 1fr));\r\n    }\r\n}\r\n\r\n#fqa-bookshelf .fqa-card {\r\n    display: block;\r\n    border-radius: 8px;\r\n    cursor: pointer;\r\n    outline: none;\r\n}\r\n\r\n#fqa-bookshelf .fqa-card:focus-visible {\r\n    box-shadow: 0 0 0 2px var(--fqa-accent);\r\n}\r\n\r\n/* 封面：3:4，靠 aspect-ratio 定高，内部元素绝对定位 */\r\n#fqa-bookshelf .fqa-cover {\r\n    position: relative;\r\n    display: block;\r\n    width: 100%;\r\n    aspect-ratio: 3 / 4;\r\n    border-radius: 6px;\r\n    overflow: hidden;\r\n    background: var(--fqa-skeleton);\r\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\r\n}\r\n\r\n#fqa-bookshelf .fqa-card:hover .fqa-cover {\r\n    transform: translateY(-4px);\r\n    box-shadow: var(--fqa-shadow);\r\n}\r\n\r\n#fqa-bookshelf .fqa-cover-img {\r\n    position: absolute;\r\n    inset: 0;\r\n    display: block;\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n    transition: opacity 0.25s ease;\r\n}\r\n\r\n#fqa-bookshelf .fqa-cover-img-loading {\r\n    opacity: 0;\r\n}\r\n\r\n#fqa-bookshelf .fqa-cover-tag {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    z-index: 2;\r\n    padding: 2px 6px;\r\n    border-radius: 0 6px 0 6px;\r\n    background: var(--fqa-accent);\r\n    color: #fff;\r\n    font-size: 11px;\r\n    line-height: 16px;\r\n    font-weight: 500;\r\n    white-space: nowrap;\r\n}\r\n\r\n/* 连载 / 完结 / 断更共用：灰底，弱化于“更新”角标 */\r\n#fqa-bookshelf .fqa-cover-tag-gray {\r\n    background: rgba(31, 35, 41, 0.55);\r\n}\r\n\r\n@media (prefers-color-scheme: dark) {\r\n    #fqa-bookshelf .fqa-cover-tag-gray {\r\n        background: rgba(0, 0, 0, 0.6);\r\n    }\r\n}\r\n\r\n#fqa-bookshelf .fqa-cover-progress {\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    z-index: 2;\r\n    height: 3px;\r\n    background: rgba(255, 255, 255, 0.35);\r\n}\r\n\r\n#fqa-bookshelf .fqa-cover-progress-bar {\r\n    display: block;\r\n    height: 100%;\r\n    background: var(--fqa-accent);\r\n    transition: width 0.3s ease;\r\n}\r\n\r\n/* 文字区：与封面同为普通流元素，不会重叠 */\r\n#fqa-bookshelf .fqa-card-title {\r\n    display: -webkit-box;\r\n    margin-top: 8px;\r\n    color: var(--fqa-text);\r\n    font-size: 14px;\r\n    line-height: 20px;\r\n    font-weight: 500;\r\n    -webkit-line-clamp: 2;\r\n    line-clamp: 2;\r\n    -webkit-box-orient: vertical;\r\n    overflow: hidden;\r\n    word-break: break-all;\r\n}\r\n\r\n#fqa-bookshelf .fqa-card-sub {\r\n    margin-top: 4px;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n/* ------------------------------- 分组卡片 ------------------------------- */\r\n\r\n#fqa-bookshelf .fqa-group-cover {\r\n    position: relative;\r\n    display: block;\r\n    width: 100%;\r\n    aspect-ratio: 3 / 4;\r\n    border-radius: 6px;\r\n    overflow: hidden;\r\n    background: linear-gradient(135deg, rgba(255, 111, 61, 0.12), rgba(78, 131, 253, 0.12));\r\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\r\n}\r\n\r\n#fqa-bookshelf .fqa-card:hover .fqa-group-cover {\r\n    transform: translateY(-4px);\r\n    box-shadow: var(--fqa-shadow);\r\n}\r\n\r\n#fqa-bookshelf .fqa-group-grid {\r\n    position: absolute;\r\n    inset: 0;\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    grid-template-rows: 1fr 1fr;\r\n    gap: 4px;\r\n    padding: 6px;\r\n}\r\n\r\n#fqa-bookshelf .fqa-group-cell {\r\n    position: relative;\r\n    border-radius: 3px;\r\n    overflow: hidden;\r\n    background: rgba(31, 35, 41, 0.06);\r\n}\r\n\r\n#fqa-bookshelf .fqa-group-cell img {\r\n    display: block;\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n}\r\n\r\n/* 分组详情返回条 */\r\n\r\n#fqa-bookshelf .fqa-groupbar {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    margin-bottom: 16px;\r\n}\r\n\r\n#fqa-bookshelf .fqa-groupbar-name {\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n}\r\n\r\n#fqa-bookshelf .fqa-groupbar-count {\r\n    color: var(--fqa-text-weak);\r\n    font-size: 13px;\r\n}\r\n\r\n/* --------------------------- hover 详情浮层 --------------------------- */\r\n\r\n/*\r\n * 用 popover 进入浏览器顶层，不参与页面 z-index 竞争，\r\n * 因此不会被相邻卡片或原站的层叠上下文盖住。z-index 仅作降级保险。\r\n */\r\n#fqa-bookshelf-hover {\r\n    position: fixed;\r\n    z-index: 2147483000;\r\n    /* 容器本身透传，只有内部卡片接收事件，避免空白区挡住下层 */\r\n    pointer-events: none;\r\n    opacity: 0;\r\n    transform: translateY(4px);\r\n    /* allow-discrete：顶层元素从 display:none 切入时也能播放淡入 */\r\n    transition: opacity 0.16s ease, transform 0.16s ease, display 0.16s allow-discrete;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial,\r\n        sans-serif;\r\n}\r\n\r\n/* popover 默认带边框/内边距/居中定位，全部清掉，改由 left/top 控制 */\r\n#fqa-bookshelf-hover:popover-open,\r\n#fqa-bookshelf-hover[popover] {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    background: transparent;\r\n    overflow: visible;\r\n    inset: auto;\r\n    width: auto;\r\n    height: auto;\r\n    max-width: none;\r\n    max-height: none;\r\n    color: inherit;\r\n}\r\n\r\n#fqa-bookshelf-hover::backdrop {\r\n    background: transparent;\r\n}\r\n\r\n#fqa-bookshelf-hover.fqa-visible {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n}\r\n\r\n@starting-style {\r\n    #fqa-bookshelf-hover.fqa-visible {\r\n        opacity: 0;\r\n        transform: translateY(4px);\r\n    }\r\n}\r\n\r\n/* 高度由 JS 按封面尺寸设定；纵向 flex 让简介吃掉剩余空间 */\r\n#fqa-bookshelf-hover .fqa-hover-inner {\r\n    display: flex;\r\n    flex-direction: column;\r\n    box-sizing: border-box;\r\n    width: 280px;\r\n    padding: 12px 14px;\r\n    border-radius: 10px;\r\n    background: #fff;\r\n    box-shadow: 0 8px 32px rgba(31, 35, 41, 0.16);\r\n    color: #1f2329;\r\n    overflow: hidden;\r\n    /* 卡片可交互：鼠标可以移进来而不触发收起 */\r\n    pointer-events: auto;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-title {\r\n    flex: none;\r\n    margin: 0;\r\n    font-size: 14px;\r\n    line-height: 20px;\r\n    font-weight: 600;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-author {\r\n    flex: none;\r\n    margin-top: 2px;\r\n    color: #8f959e;\r\n    font-size: 12px;\r\n    line-height: 17px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stats {\r\n    display: flex;\r\n    flex: none;\r\n    margin-top: 10px;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat {\r\n    flex: 1 1 0;\r\n    min-width: 0;\r\n    padding: 0 6px;\r\n    text-align: center;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat:first-child {\r\n    padding-left: 0;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat:last-child {\r\n    padding-right: 0;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat + .fqa-hover-stat {\r\n    border-left: 1px solid rgba(31, 35, 41, 0.08);\r\n}\r\n\r\n/* 第一栏可悬停切换为更新时间，给个可交互提示 */\r\n#fqa-bookshelf-hover .fqa-hover-stat:first-child {\r\n    border-radius: 4px;\r\n    cursor: default;\r\n    transition: background 0.15s ease;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat:first-child:hover {\r\n    background: rgba(31, 35, 41, 0.05);\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat-v {\r\n    font-size: 13px;\r\n    line-height: 18px;\r\n    font-weight: 600;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-stat-k {\r\n    margin-top: 1px;\r\n    color: #8f959e;\r\n    font-size: 11px;\r\n    line-height: 16px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n/* 梗概 / 简介 双栏切换 */\r\n#fqa-bookshelf-hover .fqa-hover-seg {\r\n    display: flex;\r\n    flex: none;\r\n    gap: 4px;\r\n    margin-top: 10px;\r\n    padding-top: 10px;\r\n    border-top: 1px solid rgba(31, 35, 41, 0.08);\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-seg-btn {\r\n    flex: 1 1 0;\r\n    padding: 4px 0;\r\n    border: 0;\r\n    border-radius: 5px;\r\n    background: rgba(31, 35, 41, 0.05);\r\n    color: #646a73;\r\n    font-family: inherit;\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n    cursor: pointer;\r\n    transition: background 0.15s ease, color 0.15s ease;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-seg-btn:hover {\r\n    color: #1f2329;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-seg-active {\r\n    background: rgba(255, 111, 61, 0.12);\r\n    color: #ff6f3d;\r\n    font-weight: 500;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-seg-active:hover {\r\n    color: #ff6f3d;\r\n}\r\n\r\n/*\r\n * 撑满剩余高度。行数不再写死，由容器高度自然裁切；\r\n * min-height:0 让 flex 子项允许被压缩，否则 overflow 不生效。\r\n */\r\n#fqa-bookshelf-hover .fqa-hover-abstract {\r\n    flex: 1 1 auto;\r\n    min-height: 0;\r\n    margin-top: 8px;\r\n    color: #646a73;\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n    overflow-y: auto;\r\n    overscroll-behavior: contain;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-abstract::-webkit-scrollbar {\r\n    width: 4px;\r\n}\r\n\r\n#fqa-bookshelf-hover .fqa-hover-abstract::-webkit-scrollbar-thumb {\r\n    border-radius: 2px;\r\n    background: rgba(31, 35, 41, 0.18);\r\n}\r\n\r\n\r\n#fqa-bookshelf-hover .fqa-hover-chapter {\r\n    display: block;\r\n    margin-bottom: 1px;\r\n    color: #1f2329;\r\n    font-weight: 500;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n/* ------------------------------- 骨架屏 ------------------------------- */\r\n\r\n#fqa-bookshelf .fqa-sk-cover {\r\n    display: block;\r\n    width: 100%;\r\n    aspect-ratio: 3 / 4;\r\n    border-radius: 6px;\r\n    background: var(--fqa-skeleton);\r\n}\r\n\r\n#fqa-bookshelf .fqa-sk-line {\r\n    height: 12px;\r\n    margin-top: 8px;\r\n    border-radius: 4px;\r\n    background: var(--fqa-skeleton);\r\n}\r\n\r\n#fqa-bookshelf .fqa-sk-anim {\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n\r\n/* keyframes fqa-shimmer 在 script.css 里全局声明 */\r\n#fqa-bookshelf .fqa-sk-anim::after {\r\n    content: '';\r\n    position: absolute;\r\n    inset: 0;\r\n    transform: translateX(-100%);\r\n    background: linear-gradient(90deg, transparent, var(--fqa-skeleton-hl), transparent);\r\n    animation: fqa-shimmer 1.4s infinite;\r\n}\r\n\r\n/* --------------------------- 空态 / 错误态 --------------------------- */\r\n\r\n#fqa-bookshelf .fqa-loadmore {\r\n    padding: 24px 0;\r\n    text-align: center;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 13px;\r\n}\r\n\r\n#fqa-bookshelf .fqa-status {\r\n    padding: 80px 16px;\r\n    text-align: center;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 14px;\r\n    line-height: 22px;\r\n}\r\n\r\n#fqa-bookshelf .fqa-status-title {\r\n    margin-bottom: 8px;\r\n    color: var(--fqa-text);\r\n    font-size: 16px;\r\n    font-weight: 500;\r\n}\r\n\r\n#fqa-bookshelf .fqa-status .fqa-btn {\r\n    margin-top: 16px;\r\n}\r\n\r\n/* ------------------------------- 深色模式 ------------------------------- */\r\n\r\n@media (prefers-color-scheme: dark) {\r\n    #fqa-bookshelf {\r\n        --fqa-text: #e6e6e6;\r\n        --fqa-text-sub: #a6a6a6;\r\n        --fqa-text-weak: #7a7a7a;\r\n        --fqa-border: rgba(255, 255, 255, 0.1);\r\n        --fqa-hover: rgba(255, 255, 255, 0.06);\r\n        --fqa-skeleton: rgba(255, 255, 255, 0.08);\r\n        --fqa-skeleton-hl: rgba(255, 255, 255, 0.14);\r\n        --fqa-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);\r\n    }\r\n\r\n    #fqa-bookshelf-hover .fqa-hover-inner {\r\n        background: #212125;\r\n        color: #e6e6e6;\r\n        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\r\n    }\r\n\r\n    #fqa-bookshelf-hover .fqa-hover-chapter {\r\n        color: #e6e6e6;\r\n    }\r\n\r\n    #fqa-bookshelf-hover .fqa-hover-abstract {\r\n        color: #a6a6a6;\r\n        border-top-color: rgba(255, 255, 255, 0.1);\r\n    }\r\n\r\n    #fqa-bookshelf-hover .fqa-hover-stat + .fqa-hover-stat {\r\n        border-left-color: rgba(255, 255, 255, 0.1);\r\n    }\r\n}\r\n\r\n/* 右键菜单与 toast 样式已移到 script.css，书架和搜索共用 */\r\n";
  const CONTAINER_ID$2 = "fqa-bookshelf-root";
  const STYLE_ID$3 = "fqa-bookshelf-style";
  const ORIGIN_SELECTOR$1 = ".muye-bookshelf, .muye-bookshelf-home-page, .bookshelf-tabs";
  let app$2 = null;
  let container$2 = null;
  let observer$2 = null;
  function injectStyle$3() {
    if (document.getElementById(STYLE_ID$3)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID$3;
    style.textContent = bookshelfcss;
    document.head.appendChild(style);
  }
  function hideOrigin$1(root = document) {
    root.querySelectorAll(ORIGIN_SELECTOR$1).forEach((el) => {
      if (el.id === CONTAINER_ID$2 || el.closest(`#${CONTAINER_ID$2}`)) return;
      el.classList.add("fqa-hide");
    });
  }
  function isBookshelfPath(path) {
    return path.startsWith("/bookshelf");
  }
  function unmount$1() {
    var _a;
    observer$2 == null ? void 0 : observer$2.disconnect();
    observer$2 = null;
    app$2 == null ? void 0 : app$2.unmount();
    app$2 = null;
    container$2 == null ? void 0 : container$2.remove();
    container$2 = null;
    (_a = document.getElementById("fqa-bookshelf-hover")) == null ? void 0 : _a.remove();
    document.querySelectorAll(ORIGIN_SELECTOR$1).forEach((el) => {
      el.classList.remove("fqa-hide");
    });
  }
  async function mainHook$2(_previous) {
    if (!isBookshelfPath(window.location.pathname)) {
      unmount$1();
      return;
    }
    if (app$2) {
      hideOrigin$1();
      return;
    }
    injectStyle$3();
    const origin = await waitForElement(ORIGIN_SELECTOR$1);
    if (!isBookshelfPath(window.location.pathname)) return;
    if (app$2) return;
    hideOrigin$1();
    container$2 = document.createElement("div");
    container$2.id = CONTAINER_ID$2;
    const anchor = origin ?? document.querySelector("#root") ?? document.body;
    if (origin == null ? void 0 : origin.parentElement) {
      origin.insertAdjacentElement("beforebegin", container$2);
    } else {
      anchor.appendChild(container$2);
    }
    app$2 = vue.createApp(_sfc_main$4);
    app$2.config.errorHandler = (err, _instance, info) => {
      console.error(`[fqa:bookshelf] Vue error (${info}):`, err);
    };
    app$2.mount(container$2);
    console.log("[fqa:bookshelf] 书架视图已挂载");
    document.title = "我的书架 - 番茄小说";
    observer$2 = new MutationObserver((mutations) => {
      var _a;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.id === CONTAINER_ID$2 || node.closest(`#${CONTAINER_ID$2}`)) continue;
          if ((_a = node.matches) == null ? void 0 : _a.call(node, ORIGIN_SELECTOR$1)) {
            node.classList.add("fqa-hide");
          } else {
            hideOrigin$1(node);
          }
        }
      }
    });
    observer$2.observe(document.body, { childList: true, subtree: true });
  }
  function filter$2(path, _query, _hash) {
    return (isBookshelfPath(path) || !!app$2) && userState.isLogin;
  }
  const _exports$2 = [
    {
      id: "bookshelfHook_onload",
      event: "load",
      filter: filter$2,
      handler: mainHook$2
    },
    {
      id: "bookshelfHook_onurlchange",
      event: "onUrlChange",
      filter: filter$2,
      handler: mainHook$2
    }
  ];
  const _hoisted_1$3 = ["aria-label"];
  const _hoisted_2$3 = { class: "fqa-sr-cover" };
  const _hoisted_3$3 = ["src", "alt"];
  const _hoisted_4$3 = {
    key: 0,
    class: "fqa-sr-badge"
  };
  const _hoisted_5$3 = { class: "fqa-sr-body" };
  const _hoisted_6$3 = ["innerHTML"];
  const _hoisted_7$3 = {
    key: 1,
    class: "fqa-sr-title"
  };
  const _hoisted_8$3 = { class: "fqa-sr-author" };
  const _hoisted_9$3 = {
    key: 2,
    class: "fqa-sr-summary"
  };
  const _hoisted_10$3 = { class: "fqa-sr-meta" };
  const _hoisted_11$2 = {
    key: 0,
    class: "fqa-sr-read"
  };
  const _hoisted_12$2 = {
    key: 3,
    class: "fqa-sr-update"
  };
  const _hoisted_13$2 = {
    key: 0,
    class: "fqa-sr-chapter"
  };
  const _hoisted_14$2 = {
    key: 1,
    class: "fqa-sr-time"
  };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "SearchBookCard",
    props: {
      book: {}
    },
    emits: ["open", "contextmenu"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const titleHtml = vue.computed(() => props.book.highlight_title ?? null);
      const statusText = vue.computed(() => mappingCreationStatus(props.book.status));
      const wordText = vue.computed(() => {
        const n = props.book.word_count;
        if (!n) return "";
        if (n >= 1e4) return `${(n / 1e4).toFixed(1).replace(/\.0$/, "")}万字`;
        return `${n}字`;
      });
      const metaParts = vue.computed(
        () => [statusText.value, wordText.value, props.book.category].filter(Boolean)
      );
      const readText = vue.computed(() => {
        if (props.book.sub_info) return props.book.sub_info;
        const n = props.book.read_count;
        if (!n) return "";
        return n >= 1e4 ? `${(n / 1e4).toFixed(1).replace(/\.0$/, "")}万人在读` : `${n}人在读`;
      });
      const updateText = vue.computed(() => {
        const t = props.book.last_publish_time;
        return t ? `${fromNow(t)}更新` : "";
      });
      const imgLoaded = vue.ref(false);
      vue.watch(
        () => props.book.cover_url,
        () => {
          imgLoaded.value = false;
        }
      );
      function onContextMenu(event) {
        event.preventDefault();
        emit("contextmenu", { book: props.book, x: event.clientX, y: event.clientY });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "fqa-sr-card",
          role: "link",
          tabindex: "0",
          "aria-label": __props.book.title,
          onClick: _cache[2] || (_cache[2] = ($event) => emit("open", __props.book)),
          onKeydown: _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => emit("open", __props.book), ["prevent"]), ["enter"])),
          onContextmenu: onContextMenu
        }, [
          vue.createElementVNode("div", _hoisted_2$3, [
            vue.createElementVNode("img", {
              class: vue.normalizeClass(["fqa-sr-cover-img", { "fqa-sr-cover-loading": !imgLoaded.value }]),
              crossorigin: "anonymous",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              src: __props.book.cover_url,
              alt: __props.book.title,
              onLoad: _cache[0] || (_cache[0] = ($event) => imgLoaded.value = true),
              onError: _cache[1] || (_cache[1] = ($event) => imgLoaded.value = true)
            }, null, 42, _hoisted_3$3),
            __props.book.in_bookshelf ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$3, "在书架")) : vue.createCommentVNode("", true)
          ]),
          vue.createElementVNode("div", _hoisted_5$3, [
            titleHtml.value ? (vue.openBlock(), vue.createElementBlock("h3", {
              key: 0,
              class: "fqa-sr-title",
              innerHTML: titleHtml.value
            }, null, 8, _hoisted_6$3)) : (vue.openBlock(), vue.createElementBlock("h3", _hoisted_7$3, vue.toDisplayString(__props.book.title), 1)),
            vue.createElementVNode("div", _hoisted_8$3, [
              vue.createElementVNode("span", null, vue.toDisplayString(__props.book.author), 1),
              vue.createElementVNode("span", {
                class: vue.normalizeClass(["fqa-sr-score", { "fqa-sr-score-none": !__props.book.score }])
              }, vue.toDisplayString(__props.book.score ? `${__props.book.score}分` : "暂无评分"), 3)
            ]),
            __props.book.summary ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_9$3, vue.toDisplayString(__props.book.summary), 1)) : vue.createCommentVNode("", true),
            vue.createElementVNode("div", _hoisted_10$3, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(metaParts.value, (part) => {
                return vue.openBlock(), vue.createElementBlock("span", {
                  key: part,
                  class: "fqa-sr-tag"
                }, vue.toDisplayString(part), 1);
              }), 128)),
              readText.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11$2, vue.toDisplayString(readText.value), 1)) : vue.createCommentVNode("", true)
            ]),
            updateText.value || __props.book.last_chapter_title ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$2, [
              __props.book.last_chapter_title ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_13$2, vue.toDisplayString(__props.book.last_chapter_title), 1)) : vue.createCommentVNode("", true),
              updateText.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14$2, vue.toDisplayString(updateText.value), 1)) : vue.createCommentVNode("", true)
            ])) : vue.createCommentVNode("", true)
          ])
        ], 40, _hoisted_1$3);
      };
    }
  });
  const BOOK_TAB_TYPE = 1;
  const RESULT_SHOW_TYPE = 110;
  const RENDERABLE_TABS = /* @__PURE__ */ new Set([1, 2, 3, 5, 8]);
  function credentials() {
    return settings$1.searchPersonalized ? "include" : "omit";
  }
  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  function bool(v) {
    if (typeof v === "string") return v !== "" && v !== "0" && v !== "false";
    return Boolean(v);
  }
  function sanitizeHighlight(html) {
    if (typeof html !== "string" || !html) return void 0;
    return html.replace(/<(?!\/?em\s*\/?>)[^>]*>/gi, "");
  }
  function normalizeBook(raw, cell) {
    var _a;
    const bookId2 = String((raw == null ? void 0 : raw.book_id) ?? "");
    if (!bookId2 || bookId2 === "0") return null;
    const hl = cell == null ? void 0 : cell.search_high_light;
    return {
      book_id: bookId2,
      title: raw.book_name || raw.original_book_name || "",
      author: raw.author || "",
      cover_url: raw.thumb_url || raw.audio_thumb_url_hd || "",
      summary: raw.abstract || "",
      status: String(raw.creation_status ?? ""),
      word_count: num(raw.word_number),
      // sub_info 是接口给的展示文案，如「404章」「10.5万人在读」
      sub_info: String(raw.sub_info ?? ""),
      read_count: num(raw.read_count),
      // 未评分的书下发 "0"，视为没有评分
      score: num(raw.score) > 0 ? String(raw.score) : "",
      category: raw.category || "",
      chapter_count: num(raw.serial_count),
      last_chapter_title: raw.last_chapter_title || "",
      last_publish_time: num(raw.last_publish_time) * 1e3,
      highlight_title: sanitizeHighlight((_a = hl == null ? void 0 : hl.title) == null ? void 0 : _a.rich_text),
      genre: raw.genre != null ? String(raw.genre) : void 0,
      in_bookshelf: bool(raw.in_bookshelf)
    };
  }
  function collectBooks(cells) {
    const books = [];
    const seen = /* @__PURE__ */ new Set();
    const take = (cell) => {
      for (const raw of (cell == null ? void 0 : cell.book_data) ?? []) {
        const book = normalizeBook(raw, cell);
        if (!book || seen.has(book.book_id)) continue;
        seen.add(book.book_id);
        books.push(book);
      }
    };
    const results = cells.filter((c) => Number(c == null ? void 0 : c.show_type) === RESULT_SHOW_TYPE);
    if (results.length) {
      results.forEach(take);
      return books;
    }
    cells.filter((c) => Array.isArray(c == null ? void 0 : c.book_data) && c.book_data.length).forEach(take);
    return books;
  }
  function collectTabs(tabs) {
    return tabs.map((t) => {
      var _a;
      return {
        tab_type: num(t == null ? void 0 : t.tab_type),
        // 字段名是 title，不是 tab_name
        tab_name: String((t == null ? void 0 : t.title) ?? ""),
        has_selector: Array.isArray((_a = t == null ? void 0 : t.selector) == null ? void 0 : _a.rows) && t.selector.rows.length > 0
      };
    }).filter((t) => t.tab_type > 0 && t.tab_name && RENDERABLE_TABS.has(t.tab_type));
  }
  function collectSelectorRows(tabs) {
    var _a, _b;
    const rows = (_b = (_a = tabs.find((t) => {
      var _a2;
      return Array.isArray((_a2 = t == null ? void 0 : t.selector) == null ? void 0 : _a2.rows);
    })) == null ? void 0 : _a.selector) == null ? void 0 : _b.rows;
    if (!Array.isArray(rows)) return [];
    return rows.map((row) => ({
      name: String((row == null ? void 0 : row.row_name) ?? ""),
      items: (Array.isArray(row == null ? void 0 : row.items) ? row.items : []).map((item) => ({
        id: String((item == null ? void 0 : item.selector_item_id) ?? ""),
        name: String((item == null ? void 0 : item.show_name) ?? ""),
        default: Boolean(item == null ? void 0 : item.is_default_selected)
      })).filter((item) => item.id && item.name)
    })).filter((row) => row.name && row.items.length > 0);
  }
  async function search({
    query,
    passback = 0,
    selectedItems = [],
    tabType = BOOK_TAB_TYPE
  }) {
    const selected = tabType === BOOK_TAB_TYPE ? selectedItems.filter(Boolean).join(",") : "";
    const j = await webGet(
      "/bookapi/search/tab/v",
      {
        query,
        passback: String(passback),
        selected_items: selected,
        tab_type: String(tabType)
      },
      credentials()
    );
    if ((j == null ? void 0 : j.code) !== void 0 && j.code !== 0) {
      throw new Error(j.message || `搜索失败(code=${j.code})`);
    }
    const tabs = Array.isArray(j == null ? void 0 : j.search_tabs) ? j.search_tabs : [];
    const current = tabs.find((t) => num(t == null ? void 0 : t.tab_type) === tabType);
    const cells = Array.isArray(current == null ? void 0 : current.data) ? current.data : [];
    const books = collectBooks(cells);
    return {
      books,
      // 回填服务端游标；没给就按已取回的书数往前推，至少不会原地打转
      next_passback: num(current == null ? void 0 : current.passback) || passback + Math.max(books.length, 1),
      has_more: Boolean(current == null ? void 0 : current.has_more) && books.length > 0,
      tabs: collectTabs(tabs),
      selector_rows: collectSelectorRows(tabs)
    };
  }
  function collectWords(list) {
    if (!Array.isArray(list)) return [];
    return list.map((t) => ({
      word: String((t == null ? void 0 : t.tag_title) ?? ""),
      // 「877405热搜值」之类的附加说明
      tag: (t == null ? void 0 : t.tag_attached) ? String(t.tag_attached) : void 0,
      label: (t == null ? void 0 : t.label) ? String(t.label) : void 0
    })).filter((w) => w.word);
  }
  function collectSugBooks(list) {
    if (!Array.isArray(list)) return [];
    return list.map((b) => ({
      book_id: String((b == null ? void 0 : b.book_id) ?? ""),
      title: String((b == null ? void 0 : b.book_name) ?? ""),
      cover_url: String((b == null ? void 0 : b.thumb_url) ?? ""),
      author: (b == null ? void 0 : b.author) ? String(b.author) : void 0,
      desc: (b == null ? void 0 : b.sub_info) ? String(b.sub_info) : void 0
    })).filter((b) => b.book_id && b.title);
  }
  function pushSection(out, title, words, books) {
    if (!words.length && !books.length) return;
    out.push({
      title: title || (words.length ? "热搜" : "推荐"),
      kind: words.length ? "hotword" : "book",
      words,
      books
    });
  }
  async function getSearchLanding() {
    const j = await webGet(
      "/bookapi/plan/v",
      {
        search_source: "1",
        scene: "10",
        new_search_middle_page: "true",
        search_middle_page_version: "2",
        from: "search_input_page",
        tab_name: "store",
        bookstore_tab: "2",
        bookstore_tab_type: "2",
        hot_word_exchange: "false",
        query_history_removed: "false",
        user_is_login: settings$1.searchPersonalized ? "1" : "0"
      },
      credentials()
    );
    if ((j == null ? void 0 : j.code) !== void 0 && j.code !== 0) {
      throw new Error(j.message || `加载推荐失败(code=${j.code})`);
    }
    const sections = [];
    for (const cell of Array.isArray(j == null ? void 0 : j.data) ? j.data : []) {
      if (Array.isArray(cell == null ? void 0 : cell.cell_data)) {
        for (const sub of cell.cell_data) {
          pushSection(
            sections,
            String((sub == null ? void 0 : sub.cell_name) ?? ""),
            collectWords(sub == null ? void 0 : sub.search_tag_data),
            collectSugBooks(sub == null ? void 0 : sub.book_data)
          );
        }
        continue;
      }
      pushSection(
        sections,
        String((cell == null ? void 0 : cell.cell_name) ?? "") || "猜你想搜",
        collectWords(cell == null ? void 0 : cell.search_tag_data),
        collectSugBooks(cell == null ? void 0 : cell.book_data)
      );
    }
    return sections;
  }
  const _hoisted_1$2 = { class: "fqa-s-landing" };
  const _hoisted_2$2 = {
    key: 0,
    class: "fqa-s-landing-sk"
  };
  const _hoisted_3$2 = {
    key: 1,
    class: "fqa-s-status"
  };
  const _hoisted_4$2 = {
    key: 2,
    class: "fqa-s-status"
  };
  const _hoisted_5$2 = { class: "fqa-s-sec-title" };
  const _hoisted_6$2 = {
    key: 0,
    class: "fqa-s-words"
  };
  const _hoisted_7$2 = ["onClick"];
  const _hoisted_8$2 = {
    key: 0,
    class: "fqa-s-word-label"
  };
  const _hoisted_9$2 = {
    key: 1,
    class: "fqa-s-word-tag"
  };
  const _hoisted_10$2 = {
    key: 1,
    class: "fqa-s-sugs"
  };
  const _hoisted_11$1 = ["onClick", "onKeydown"];
  const _hoisted_12$1 = ["src", "alt"];
  const _hoisted_13$1 = ["title"];
  const _hoisted_14$1 = {
    key: 0,
    class: "fqa-s-sug-sub"
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "SearchLanding",
    emits: ["word"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const sections = vue.ref([]);
      const loading = vue.ref(true);
      const error = vue.ref(null);
      async function load2() {
        loading.value = true;
        error.value = null;
        try {
          sections.value = await getSearchLanding();
        } catch (err) {
          console.error("[fqa:search] 推荐加载失败:", err);
          error.value = err instanceof Error ? err.message : String(err);
        } finally {
          loading.value = false;
        }
      }
      function openBook(bookId2) {
        unsafeWindow.location.href = `https://fanqienovel.com/page/${bookId2}`;
      }
      vue.onMounted(load2);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          loading.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$2, [
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(12, (n) => {
              return vue.createElementVNode("div", {
                key: n,
                class: "fqa-sk-chip fqa-sk-anim"
              });
            }), 64))
          ])) : error.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$2, [
            _cache[0] || (_cache[0] = vue.createElementVNode("div", { class: "fqa-s-status-title" }, "推荐内容加载失败", -1)),
            _cache[1] || (_cache[1] = vue.createElementVNode("div", null, "直接在上方输入关键词也可以搜索", -1)),
            vue.createElementVNode("button", {
              class: "fqa-s-submit",
              onClick: load2
            }, "重试")
          ])) : !sections.value.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, [..._cache[2] || (_cache[2] = [
            vue.createElementVNode("div", { class: "fqa-s-status-title" }, "输入关键词开始搜索", -1)
          ])])) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 3 }, vue.renderList(sections.value, (section, i2) => {
            return vue.openBlock(), vue.createElementBlock("section", {
              key: `${section.title}-${i2}`,
              class: "fqa-s-sec"
            }, [
              vue.createElementVNode("h3", _hoisted_5$2, vue.toDisplayString(section.title), 1),
              section.words.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$2, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(section.words, (w, wi) => {
                  return vue.openBlock(), vue.createElementBlock("button", {
                    key: `${w.word}-${wi}`,
                    class: "fqa-s-word",
                    onClick: ($event) => emit("word", w.word)
                  }, [
                    w.label ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8$2, vue.toDisplayString(w.label), 1)) : vue.createCommentVNode("", true),
                    vue.createTextVNode(" " + vue.toDisplayString(w.word) + " ", 1),
                    w.tag ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$2, vue.toDisplayString(w.tag), 1)) : vue.createCommentVNode("", true)
                  ], 8, _hoisted_7$2);
                }), 128))
              ])) : vue.createCommentVNode("", true),
              section.books.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$2, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(section.books, (b) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key: b.book_id,
                    class: "fqa-s-sug",
                    role: "link",
                    tabindex: "0",
                    onClick: ($event) => openBook(b.book_id),
                    onKeydown: vue.withKeys(vue.withModifiers(($event) => openBook(b.book_id), ["prevent"]), ["enter"])
                  }, [
                    vue.createElementVNode("img", {
                      class: "fqa-s-sug-cover",
                      crossorigin: "anonymous",
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: b.cover_url,
                      alt: b.title
                    }, null, 8, _hoisted_12$1),
                    vue.createElementVNode("div", {
                      class: "fqa-s-sug-title",
                      title: b.title
                    }, vue.toDisplayString(b.title), 9, _hoisted_13$1),
                    b.desc || b.author ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14$1, vue.toDisplayString(b.desc || b.author), 1)) : vue.createCommentVNode("", true)
                  ], 40, _hoisted_11$1);
                }), 128))
              ])) : vue.createCommentVNode("", true)
            ]);
          }), 128))
        ]);
      };
    }
  });
  const FALLBACK_TABS = [{ tab_type: BOOK_TAB_TYPE, tab_name: "综合", has_selector: true }];
  function useSearch() {
    const query = vue.ref("");
    const tabType = vue.ref(BOOK_TAB_TYPE);
    const tabs = vue.ref([]);
    const selectorRows = vue.ref([]);
    const selected = vue.ref({});
    const books = vue.ref([]);
    const passback = vue.ref(0);
    const hasMore = vue.ref(false);
    const loading = vue.ref(false);
    const loadingMore = vue.ref(false);
    const error = vue.ref(null);
    const searched = vue.ref(false);
    let token = 0;
    const selectedItems = vue.computed(
      () => Object.values(selected.value).filter(Boolean)
    );
    const availableTabs = vue.computed(() => tabs.value.length ? tabs.value : FALLBACK_TABS);
    const canFilter = vue.computed(() => tabType.value === BOOK_TAB_TYPE && selectorRows.value.length > 0);
    const filterCount = vue.computed(() => selectedItems.value.length);
    async function run(reset2) {
      const q = query.value.trim();
      if (!q) return;
      const current = ++token;
      if (reset2) {
        passback.value = 0;
        loading.value = true;
        error.value = null;
      } else {
        if (loadingMore.value || !hasMore.value) return;
        loadingMore.value = true;
      }
      try {
        const result = await search({
          query: q,
          passback: passback.value,
          selectedItems: selectedItems.value,
          tabType: tabType.value
        });
        if (current !== token) return;
        if (reset2) {
          books.value = result.books;
        } else {
          const seen = new Set(books.value.map((b) => b.book_id));
          books.value = [...books.value, ...result.books.filter((b) => !seen.has(b.book_id))];
        }
        passback.value = result.next_passback;
        hasMore.value = result.has_more;
        if (result.tabs.length) tabs.value = result.tabs;
        if (result.selector_rows.length) selectorRows.value = result.selector_rows;
        searched.value = true;
      } catch (err) {
        if (current !== token) return;
        console.error("[fqa:search] 搜索失败:", err);
        error.value = err instanceof Error ? err.message : String(err);
        if (reset2) books.value = [];
        searched.value = true;
      } finally {
        if (current === token) {
          loading.value = false;
          loadingMore.value = false;
        }
      }
    }
    async function submit(q) {
      if (q !== void 0) query.value = q;
      await run(true);
    }
    function reset() {
      token++;
      query.value = "";
      books.value = [];
      passback.value = 0;
      hasMore.value = false;
      searched.value = false;
      error.value = null;
      loading.value = false;
      loadingMore.value = false;
      selected.value = {};
      tabType.value = BOOK_TAB_TYPE;
    }
    async function loadMore() {
      if (!hasMore.value || loading.value || loadingMore.value) return;
      await run(false);
    }
    function selectTab(next) {
      if (tabType.value === next) return;
      tabType.value = next;
      if (next !== BOOK_TAB_TYPE) selected.value = {};
      void run(true);
    }
    function toggleFilter(rowName, itemId2) {
      const cur = selected.value[rowName];
      if (cur === itemId2) {
        const next = { ...selected.value };
        delete next[rowName];
        selected.value = next;
      } else {
        selected.value = { ...selected.value, [rowName]: itemId2 };
      }
      void run(true);
    }
    function clearFilters() {
      if (!filterCount.value) return;
      selected.value = {};
      void run(true);
    }
    const isEmpty = vue.computed(
      () => searched.value && !loading.value && !error.value && books.value.length === 0
    );
    return {
      query,
      tabType,
      availableTabs,
      selectorRows,
      selected,
      canFilter,
      filterCount,
      books,
      hasMore,
      loading,
      loadingMore,
      error,
      searched,
      isEmpty,
      submit,
      reset,
      loadMore,
      selectTab,
      toggleFilter,
      clearFilters
    };
  }
  const routeQuery = vue.ref("");
  function parseQuery(path) {
    const rest = path.replace(/^\/search\/?/, "");
    if (!rest) return "";
    try {
      return decodeURIComponent(rest);
    } catch {
      return rest;
    }
  }
  function syncFromUrl(path) {
    const q = parseQuery(path);
    if (routeQuery.value !== q) routeQuery.value = q;
  }
  function pushQuery(q) {
    routeQuery.value = q;
    const next = q ? `/search/${encodeURIComponent(q)}` : "/search";
    if (unsafeWindow.location.pathname === next) return;
    unsafeWindow.history.pushState(null, "", next);
  }
  const _hoisted_1$1 = { id: "fqa-search" };
  const _hoisted_2$1 = { class: "fqa-s-bar" };
  const _hoisted_3$1 = { class: "fqa-s-inputwrap" };
  const _hoisted_4$1 = ["disabled"];
  const _hoisted_5$1 = ["aria-selected", "onClick", "onKeydown"];
  const _hoisted_6$1 = {
    key: 0,
    class: "fqa-s-filterbar"
  };
  const _hoisted_7$1 = {
    key: 0,
    class: "fqa-s-fcount"
  };
  const _hoisted_8$1 = { class: "fqa-s-hint" };
  const _hoisted_9$1 = {
    key: 1,
    class: "fqa-s-filters"
  };
  const _hoisted_10$1 = { class: "fqa-s-frow-name" };
  const _hoisted_11 = { class: "fqa-s-fitems" };
  const _hoisted_12 = ["onClick"];
  const _hoisted_13 = {
    key: 2,
    class: "fqa-s-status"
  };
  const _hoisted_14 = {
    key: 3,
    class: "fqa-s-status"
  };
  const _hoisted_15 = { class: "fqa-s-list" };
  const _hoisted_16 = {
    key: 1,
    class: "fqa-s-loadmore"
  };
  const _hoisted_17 = {
    key: 2,
    class: "fqa-s-inline-error"
  };
  const _hoisted_18 = {
    key: 2,
    class: "fqa-s-privacy"
  };
  const _hoisted_19 = {
    key: 0,
    class: "fqa-toast"
  };
  const DOWNLOAD_PREFIX = "download:";
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "SearchView",
    setup(__props) {
      const {
        query,
        tabType,
        availableTabs,
        selectorRows,
        selected,
        canFilter,
        filterCount,
        books,
        hasMore,
        loading,
        loadingMore,
        error,
        isEmpty,
        submit,
        reset,
        loadMore,
        selectTab,
        toggleFilter,
        clearFilters
      } = useSearch();
      const input = vue.ref(routeQuery.value);
      const filterOpen = vue.ref(false);
      const showLanding = vue.computed(() => !query.value.trim());
      async function doSearch(q = input.value) {
        const trimmed = q.trim();
        if (!trimmed) return;
        input.value = trimmed;
        filterOpen.value = false;
        pushQuery(trimmed);
        await submit(trimmed);
      }
      function onWord(word) {
        void doSearch(word);
      }
      const sentinel = vue.ref(null);
      let io = null;
      vue.onMounted(async () => {
        if (routeQuery.value) await doSearch(routeQuery.value);
        if (typeof IntersectionObserver !== "undefined") {
          io = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) void loadMore();
            },
            { rootMargin: "400px" }
          );
          vue.watch(
            sentinel,
            (el) => {
              io == null ? void 0 : io.disconnect();
              if (el) io == null ? void 0 : io.observe(el);
            },
            { immediate: true, flush: "post" }
          );
        }
      });
      vue.onBeforeUnmount(() => {
        io == null ? void 0 : io.disconnect();
        io = null;
      });
      vue.watch(
        routeQuery,
        (q) => {
          input.value = q;
          if (q === query.value.trim()) return;
          if (q) {
            void submit(q);
          } else {
            filterOpen.value = false;
            reset();
          }
        }
      );
      const menuVisible = vue.ref(false);
      const menuPos = vue.ref({ x: 0, y: 0 });
      const menuBook = vue.ref(null);
      const toast = vue.ref(null);
      let toastTimer;
      function showToast(msg) {
        toast.value = msg;
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.value = null;
          toastTimer = void 0;
        }, 2600);
      }
      const menuItems = vue.computed(() => {
        var _a, _b, _c;
        const items = [
          { key: "detail", label: "查看详情" },
          {
            key: "shelf",
            label: ((_a = menuBook.value) == null ? void 0 : _a.in_bookshelf) ? "已在书架" : "加入书架",
            disabled: !userState.isLogin || Boolean((_b = menuBook.value) == null ? void 0 : _b.in_bookshelf)
          },
          { key: "author", label: "搜索该作者", disabled: !((_c = menuBook.value) == null ? void 0 : _c.author) }
        ];
        if (settings$1.enableDownload) {
          items.push({
            key: "download",
            label: "下载",
            children: [
              { key: `${DOWNLOAD_PREFIX}epub`, label: "EPUB" },
              { key: `${DOWNLOAD_PREFIX}txt`, label: "TXT" }
            ]
          });
        }
        return items;
      });
      function onCardContextMenu({ book, x, y }) {
        menuBook.value = book;
        menuPos.value = { x, y };
        menuVisible.value = true;
      }
      function openBook(book) {
        unsafeWindow.location.href = `https://fanqienovel.com/page/${book.book_id}`;
      }
      async function onMenuSelect(key) {
        const book = menuBook.value;
        if (!book) return;
        if (key === "detail") {
          openBook(book);
          return;
        }
        if (key === "author") {
          void doSearch(book.author);
          return;
        }
        if (key.startsWith(DOWNLOAD_PREFIX)) {
          const format = key.slice(DOWNLOAD_PREFIX.length);
          void startDownload(book.book_id, { format });
          return;
        }
        if (key === "shelf") {
          try {
            await addToBookshelf(book.book_id);
            book.in_bookshelf = true;
            showToast(`已把《${book.title}》加入书架`);
          } catch (err) {
            console.error("[fqa:search] 加入书架失败:", err);
            showToast(err instanceof Error ? err.message : "加入书架失败");
          }
        }
      }
      const tabsRef = vue.ref(null);
      const inkStyle = vue.ref({ left: "0px", width: "0px" });
      function updateInk() {
        const wrap = tabsRef.value;
        if (!wrap) return;
        const index = availableTabs.value.findIndex((t) => t.tab_type === tabType.value);
        const el = wrap.querySelectorAll(".fqa-s-tab")[index];
        if (!el) return;
        inkStyle.value = { left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` };
      }
      vue.watch([tabType, availableTabs], () => vue.nextTick(updateInk), { deep: true });
      vue.watch(showLanding, () => vue.nextTick(updateInk));
      vue.onMounted(() => {
        window.addEventListener("resize", updateInk);
      });
      vue.onBeforeUnmount(() => {
        window.removeEventListener("resize", updateInk);
        if (toastTimer) clearTimeout(toastTimer);
      });
      const resultHint = vue.computed(() => {
        if (loading.value) return "搜索中…";
        if (books.value.length) return `已加载 ${books.value.length} 条`;
        return "";
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createElementVNode("div", _hoisted_2$1, [
            vue.createElementVNode("div", _hoisted_3$1, [
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
                class: "fqa-s-input",
                type: "search",
                placeholder: "搜索书名、作者",
                "aria-label": "搜索",
                onKeydown: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(($event) => doSearch(), ["prevent"]), ["enter"]))
              }, null, 544), [
                [vue.vModelText, input.value]
              ]),
              input.value ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "fqa-s-clear",
                "aria-label": "清空",
                onClick: _cache[2] || (_cache[2] = ($event) => input.value = "")
              }, " ✕ ")) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("button", {
              class: "fqa-s-submit",
              disabled: !input.value.trim() || vue.unref(loading),
              onClick: _cache[3] || (_cache[3] = ($event) => doSearch())
            }, " 搜索 ", 8, _hoisted_4$1)
          ]),
          showLanding.value ? (vue.openBlock(), vue.createBlock(_sfc_main$2, {
            key: 0,
            onWord
          })) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createElementVNode("div", {
              ref_key: "tabsRef",
              ref: tabsRef,
              class: "fqa-s-tabs",
              role: "tablist"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(availableTabs), (tab) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: tab.tab_type,
                  class: vue.normalizeClass(["fqa-s-tab", { "fqa-s-tab-active": vue.unref(tabType) === tab.tab_type }]),
                  role: "tab",
                  tabindex: "0",
                  "aria-selected": vue.unref(tabType) === tab.tab_type,
                  onClick: ($event) => vue.unref(selectTab)(tab.tab_type),
                  onKeydown: vue.withKeys(vue.withModifiers(($event) => vue.unref(selectTab)(tab.tab_type), ["prevent"]), ["enter"])
                }, vue.toDisplayString(tab.tab_name), 43, _hoisted_5$1);
              }), 128)),
              vue.createElementVNode("span", {
                class: "fqa-s-tab-ink",
                style: vue.normalizeStyle(inkStyle.value)
              }, null, 4)
            ], 512),
            vue.unref(canFilter) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$1, [
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["fqa-s-fbtn", { "fqa-s-fbtn-on": filterOpen.value || vue.unref(filterCount) > 0 }]),
                onClick: _cache[4] || (_cache[4] = ($event) => filterOpen.value = !filterOpen.value)
              }, [
                _cache[8] || (_cache[8] = vue.createTextVNode(" 筛选", -1)),
                vue.unref(filterCount) ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7$1, vue.toDisplayString(vue.unref(filterCount)), 1)) : vue.createCommentVNode("", true)
              ], 2),
              vue.unref(filterCount) ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "fqa-s-fclear",
                onClick: _cache[5] || (_cache[5] = //@ts-ignore
                (...args) => vue.unref(clearFilters) && vue.unref(clearFilters)(...args))
              }, "清除")) : vue.createCommentVNode("", true),
              vue.createElementVNode("span", _hoisted_8$1, vue.toDisplayString(resultHint.value), 1)
            ])) : vue.createCommentVNode("", true),
            vue.unref(canFilter) && filterOpen.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$1, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(selectorRows), (row) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: row.name,
                  class: "fqa-s-frow"
                }, [
                  vue.createElementVNode("span", _hoisted_10$1, vue.toDisplayString(row.name), 1),
                  vue.createElementVNode("div", _hoisted_11, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(row.items, (item) => {
                      return vue.openBlock(), vue.createElementBlock("button", {
                        key: item.id,
                        class: vue.normalizeClass(["fqa-s-fitem", { "fqa-s-fitem-on": vue.unref(selected)[row.name] === item.id }]),
                        onClick: ($event) => vue.unref(toggleFilter)(row.name, item.id)
                      }, vue.toDisplayString(item.name), 11, _hoisted_12);
                    }), 128))
                  ])
                ]);
              }), 128))
            ])) : vue.createCommentVNode("", true),
            vue.unref(error) && !vue.unref(books).length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13, [
              _cache[9] || (_cache[9] = vue.createElementVNode("div", { class: "fqa-s-status-title" }, "搜索失败", -1)),
              vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(error)), 1),
              vue.createElementVNode("button", {
                class: "fqa-s-submit",
                onClick: _cache[6] || (_cache[6] = ($event) => doSearch())
              }, "重试")
            ])) : vue.unref(isEmpty) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14, [..._cache[10] || (_cache[10] = [
              vue.createElementVNode("div", { class: "fqa-s-status-title" }, "没有找到相关内容", -1),
              vue.createElementVNode("div", null, "换个关键词或者放宽筛选条件试试", -1)
            ])])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
              vue.createElementVNode("div", _hoisted_15, [
                vue.unref(loading) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(5, (n) => {
                  return vue.createElementVNode("div", {
                    key: `sk-${n}`,
                    class: "fqa-sr-card fqa-sr-skeleton"
                  }, [..._cache[11] || (_cache[11] = [
                    vue.createStaticVNode('<div class="fqa-sk-cover fqa-sk-anim"></div><div class="fqa-sr-body"><div class="fqa-sk-line fqa-sk-anim" style="width:40%;"></div><div class="fqa-sk-line fqa-sk-anim" style="width:24%;"></div><div class="fqa-sk-line fqa-sk-anim" style="width:92%;"></div><div class="fqa-sk-line fqa-sk-anim" style="width:76%;"></div></div>', 2)
                  ])]);
                }), 64)) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(vue.unref(books), (book) => {
                  return vue.openBlock(), vue.createBlock(_sfc_main$3, {
                    key: book.book_id,
                    book,
                    onOpen: openBook,
                    onContextmenu: onCardContextMenu
                  }, null, 8, ["book"]);
                }), 128))
              ]),
              !vue.unref(loading) && vue.unref(hasMore) ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                ref_key: "sentinel",
                ref: sentinel,
                class: "fqa-s-loadmore"
              }, vue.toDisplayString(vue.unref(loadingMore) ? "加载中…" : "滚动加载更多"), 513)) : !vue.unref(loading) && vue.unref(books).length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16, "没有更多了")) : vue.createCommentVNode("", true),
              vue.unref(error) && vue.unref(books).length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_17, vue.toDisplayString(vue.unref(error)), 1)) : vue.createCommentVNode("", true)
            ], 64))
          ], 64)),
          !vue.unref(settings$1).searchPersonalized ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_18, " 当前使用匿名搜索。如需按你的阅读偏好排序，可在助手设置里开启个人化推荐。 ")) : vue.createCommentVNode("", true),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
            vue.createVNode(_sfc_main$5, {
              visible: menuVisible.value,
              x: menuPos.value.x,
              y: menuPos.value.y,
              items: menuItems.value,
              onSelect: onMenuSelect,
              onClose: _cache[7] || (_cache[7] = ($event) => menuVisible.value = false)
            }, null, 8, ["visible", "x", "y", "items"]),
            toast.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_19, vue.toDisplayString(toast.value), 1)) : vue.createCommentVNode("", true)
          ]))
        ]);
      };
    }
  });
  const searchcss = "#fqa-search {\r\n    --fqa-text: #1f2329;\r\n    --fqa-text-sub: #646a73;\r\n    --fqa-text-weak: #8f959e;\r\n    --fqa-border: rgba(31, 35, 41, 0.08);\r\n    --fqa-hover: rgba(31, 35, 41, 0.04);\r\n    --fqa-accent: #ff6f3d;\r\n    --fqa-skeleton: rgba(31, 35, 41, 0.06);\r\n    --fqa-skeleton-hl: rgba(31, 35, 41, 0.12);\r\n    --fqa-shadow: 0 4px 16px rgba(31, 35, 41, 0.08);\r\n    --fqa-card-bg: #fff;\r\n\r\n    display: block;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    max-width: 1000px;\r\n    margin: 0 auto;\r\n    /* 顶部让开原站 fixed 顶栏 */\r\n    padding: calc(80px + 24px) 16px 64px;\r\n    color: var(--fqa-text);\r\n    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial,\r\n        sans-serif;\r\n}\r\n\r\n#fqa-search *,\r\n#fqa-search *::before,\r\n#fqa-search *::after {\r\n    box-sizing: border-box;\r\n}\r\n\r\n#fqa-search div,\r\n#fqa-search span,\r\n#fqa-search h3,\r\n#fqa-search p {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    float: none;\r\n    position: static;\r\n}\r\n\r\n/* -------------------------------- 搜索栏 -------------------------------- */\r\n\r\n#fqa-search .fqa-s-bar {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n#fqa-search .fqa-s-inputwrap {\r\n    position: relative;\r\n    flex: 1 1 auto;\r\n    min-width: 0;\r\n}\r\n\r\n#fqa-search .fqa-s-input {\r\n    width: 100%;\r\n    padding: 11px 36px 11px 16px;\r\n    box-sizing: border-box;\r\n    border: 1px solid var(--fqa-border);\r\n    border-radius: 999px;\r\n    background: var(--fqa-card-bg);\r\n    color: var(--fqa-text);\r\n    font-size: 15px;\r\n    font-family: inherit;\r\n    line-height: 22px;\r\n    transition: border-color 0.15s ease, box-shadow 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-input::placeholder {\r\n    color: var(--fqa-text-weak);\r\n}\r\n\r\n#fqa-search .fqa-s-input:focus {\r\n    outline: none;\r\n    border-color: var(--fqa-accent);\r\n    box-shadow: 0 0 0 3px rgba(255, 111, 61, 0.12);\r\n}\r\n\r\n/* 隐藏浏览器自带的 search 清除按钮，用自己的 */\r\n#fqa-search .fqa-s-input::-webkit-search-cancel-button {\r\n    appearance: none;\r\n}\r\n\r\n#fqa-search .fqa-s-clear {\r\n    position: absolute;\r\n    top: 50%;\r\n    right: 10px;\r\n    transform: translateY(-50%);\r\n    width: 22px;\r\n    height: 22px;\r\n    padding: 0;\r\n    border: 0;\r\n    border-radius: 50%;\r\n    background: var(--fqa-hover);\r\n    color: var(--fqa-text-weak);\r\n    font-size: 11px;\r\n    line-height: 1;\r\n    cursor: pointer;\r\n}\r\n\r\n#fqa-search .fqa-s-clear:hover {\r\n    color: var(--fqa-text);\r\n}\r\n\r\n#fqa-search .fqa-s-submit {\r\n    flex: 0 0 auto;\r\n    padding: 11px 24px;\r\n    border: 0;\r\n    border-radius: 999px;\r\n    background: var(--fqa-accent);\r\n    color: #fff;\r\n    font-size: 15px;\r\n    font-family: inherit;\r\n    line-height: 22px;\r\n    cursor: pointer;\r\n    transition: opacity 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-submit:hover:not(:disabled) {\r\n    opacity: 0.88;\r\n}\r\n\r\n#fqa-search .fqa-s-submit:disabled {\r\n    opacity: 0.45;\r\n    cursor: default;\r\n}\r\n\r\n/* --------------------------------- tab --------------------------------- */\r\n\r\n#fqa-search .fqa-s-tabs {\r\n    position: relative;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    margin-bottom: 16px;\r\n    border-bottom: 1px solid var(--fqa-border);\r\n    overflow-x: auto;\r\n    scrollbar-width: none;\r\n}\r\n\r\n#fqa-search .fqa-s-tabs::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n#fqa-search .fqa-s-tab {\r\n    flex: 0 0 auto;\r\n    padding: 10px 16px;\r\n    color: var(--fqa-text-sub);\r\n    font-size: 15px;\r\n    line-height: 22px;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    user-select: none;\r\n    transition: color 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-tab:hover {\r\n    color: var(--fqa-text);\r\n}\r\n\r\n#fqa-search .fqa-s-tab-active {\r\n    color: var(--fqa-accent);\r\n    font-weight: 600;\r\n}\r\n\r\n#fqa-search .fqa-s-tab-ink {\r\n    position: absolute;\r\n    bottom: -1px;\r\n    left: 0;\r\n    width: 0;\r\n    height: 2px;\r\n    border-radius: 2px;\r\n    background: var(--fqa-accent);\r\n    transition: left 0.25s ease, width 0.25s ease;\r\n}\r\n\r\n/* -------------------------------- 筛选器 -------------------------------- */\r\n\r\n#fqa-search .fqa-s-filterbar {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    margin-bottom: 12px;\r\n}\r\n\r\n#fqa-search .fqa-s-fbtn,\r\n#fqa-search .fqa-s-fclear {\r\n    padding: 5px 14px;\r\n    border: 1px solid var(--fqa-border);\r\n    border-radius: 999px;\r\n    background: transparent;\r\n    color: var(--fqa-text-sub);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    line-height: 20px;\r\n    cursor: pointer;\r\n    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-fbtn:hover,\r\n#fqa-search .fqa-s-fclear:hover {\r\n    border-color: var(--fqa-accent);\r\n    color: var(--fqa-accent);\r\n}\r\n\r\n#fqa-search .fqa-s-fbtn-on {\r\n    border-color: var(--fqa-accent);\r\n    color: var(--fqa-accent);\r\n    background: rgba(255, 111, 61, 0.08);\r\n}\r\n\r\n#fqa-search .fqa-s-fcount {\r\n    display: inline-block;\r\n    min-width: 16px;\r\n    margin-left: 5px;\r\n    padding: 0 4px;\r\n    border-radius: 8px;\r\n    background: var(--fqa-accent);\r\n    color: #fff;\r\n    font-size: 11px;\r\n    line-height: 16px;\r\n    text-align: center;\r\n}\r\n\r\n#fqa-search .fqa-s-hint {\r\n    margin-left: auto;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 13px;\r\n}\r\n\r\n#fqa-search .fqa-s-filters {\r\n    margin-bottom: 16px;\r\n    padding: 14px 16px;\r\n    border: 1px solid var(--fqa-border);\r\n    border-radius: 10px;\r\n    background: var(--fqa-card-bg);\r\n}\r\n\r\n#fqa-search .fqa-s-frow {\r\n    display: flex;\r\n    align-items: flex-start;\r\n    gap: 12px;\r\n    padding: 7px 0;\r\n}\r\n\r\n#fqa-search .fqa-s-frow-name {\r\n    flex: 0 0 58px;\r\n    padding-top: 5px;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 13px;\r\n    line-height: 20px;\r\n}\r\n\r\n#fqa-search .fqa-s-fitems {\r\n    display: flex;\r\n    flex: 1 1 auto;\r\n    flex-wrap: wrap;\r\n    gap: 8px;\r\n    min-width: 0;\r\n}\r\n\r\n#fqa-search .fqa-s-fitem {\r\n    padding: 4px 12px;\r\n    border: 1px solid transparent;\r\n    border-radius: 6px;\r\n    background: var(--fqa-hover);\r\n    color: var(--fqa-text-sub);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    line-height: 20px;\r\n    cursor: pointer;\r\n    transition: background 0.15s ease, color 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-fitem:hover {\r\n    color: var(--fqa-text);\r\n}\r\n\r\n#fqa-search .fqa-s-fitem-on {\r\n    background: rgba(255, 111, 61, 0.12);\r\n    border-color: rgba(255, 111, 61, 0.4);\r\n    color: var(--fqa-accent);\r\n    font-weight: 500;\r\n}\r\n\r\n/* ------------------------------- 结果列表 ------------------------------- */\r\n\r\n#fqa-search .fqa-s-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n}\r\n\r\n#fqa-search .fqa-sr-card {\r\n    display: flex;\r\n    gap: 16px;\r\n    padding: 16px 12px;\r\n    border-radius: 10px;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: background 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-sr-card:hover {\r\n    background: var(--fqa-hover);\r\n}\r\n\r\n#fqa-search .fqa-sr-card:focus-visible {\r\n    box-shadow: 0 0 0 2px var(--fqa-accent);\r\n}\r\n\r\n#fqa-search .fqa-sr-skeleton {\r\n    cursor: default;\r\n}\r\n\r\n#fqa-search .fqa-sr-skeleton:hover {\r\n    background: transparent;\r\n}\r\n\r\n#fqa-search .fqa-sr-cover {\r\n    position: relative;\r\n    flex: 0 0 96px;\r\n    width: 96px;\r\n    aspect-ratio: 3 / 4;\r\n    border-radius: 6px;\r\n    overflow: hidden;\r\n    background: var(--fqa-skeleton);\r\n}\r\n\r\n#fqa-search .fqa-sr-cover-img {\r\n    position: absolute;\r\n    inset: 0;\r\n    display: block;\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n    transition: opacity 0.25s ease;\r\n}\r\n\r\n#fqa-search .fqa-sr-cover-loading {\r\n    opacity: 0;\r\n}\r\n\r\n#fqa-search .fqa-sr-badge {\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    padding: 2px 4px;\r\n    background: rgba(31, 35, 41, 0.7);\r\n    color: #fff;\r\n    font-size: 10px;\r\n    line-height: 14px;\r\n    text-align: center;\r\n}\r\n\r\n#fqa-search .fqa-sr-body {\r\n    display: flex;\r\n    flex: 1 1 auto;\r\n    flex-direction: column;\r\n    min-width: 0;\r\n}\r\n\r\n#fqa-search .fqa-sr-title {\r\n    color: var(--fqa-text);\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    line-height: 24px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n/* 接口下发的高亮片段 */\r\n#fqa-search .fqa-sr-title em {\r\n    color: var(--fqa-accent);\r\n    font-style: normal;\r\n}\r\n\r\n#fqa-search .fqa-sr-author {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-top: 3px;\r\n    color: var(--fqa-text-sub);\r\n    font-size: 13px;\r\n    line-height: 20px;\r\n}\r\n\r\n#fqa-search .fqa-sr-author > span:first-child {\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-search .fqa-sr-score {\r\n    flex: 0 0 auto;\r\n    color: var(--fqa-accent);\r\n    font-weight: 500;\r\n}\r\n\r\n/* 无评分时弱化，不跟真实分数抢注意力 */\r\n#fqa-search .fqa-sr-score-none {\r\n    color: var(--fqa-text-weak);\r\n    font-weight: 400;\r\n}\r\n\r\n#fqa-search .fqa-sr-summary {\r\n    display: -webkit-box;\r\n    margin-top: 6px;\r\n    color: var(--fqa-text-sub);\r\n    font-size: 13px;\r\n    line-height: 20px;\r\n    -webkit-line-clamp: 2;\r\n    line-clamp: 2;\r\n    -webkit-box-orient: vertical;\r\n    overflow: hidden;\r\n}\r\n\r\n#fqa-search .fqa-sr-meta {\r\n    display: flex;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 6px;\r\n    margin-top: 8px;\r\n}\r\n\r\n#fqa-search .fqa-sr-tag {\r\n    padding: 1px 7px;\r\n    border-radius: 4px;\r\n    background: var(--fqa-hover);\r\n    color: var(--fqa-text-weak);\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n}\r\n\r\n#fqa-search .fqa-sr-read {\r\n    color: var(--fqa-text-weak);\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n}\r\n\r\n#fqa-search .fqa-sr-update {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-top: 6px;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n}\r\n\r\n#fqa-search .fqa-sr-chapter {\r\n    min-width: 0;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-search .fqa-sr-time {\r\n    flex: 0 0 auto;\r\n}\r\n\r\n@media (max-width: 600px) {\r\n    #fqa-search .fqa-sr-cover {\r\n        flex-basis: 72px;\r\n        width: 72px;\r\n    }\r\n\r\n    #fqa-search .fqa-sr-summary {\r\n        -webkit-line-clamp: 3;\r\n        line-clamp: 3;\r\n    }\r\n}\r\n\r\n/* -------------------------------- 落地页 -------------------------------- */\r\n\r\n#fqa-search .fqa-s-sec {\r\n    margin-bottom: 28px;\r\n}\r\n\r\n#fqa-search .fqa-s-sec-title {\r\n    margin-bottom: 12px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    line-height: 24px;\r\n}\r\n\r\n#fqa-search .fqa-s-words {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 8px;\r\n}\r\n\r\n#fqa-search .fqa-s-word {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 5px;\r\n    padding: 6px 14px;\r\n    border: 0;\r\n    border-radius: 999px;\r\n    background: var(--fqa-hover);\r\n    color: var(--fqa-text-sub);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    line-height: 20px;\r\n    cursor: pointer;\r\n    transition: background 0.15s ease, color 0.15s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-word:hover {\r\n    background: rgba(255, 111, 61, 0.1);\r\n    color: var(--fqa-accent);\r\n}\r\n\r\n#fqa-search .fqa-s-word-tag {\r\n    color: var(--fqa-text-weak);\r\n    font-size: 11px;\r\n}\r\n\r\n/* 「荐」「热」这类角标 */\r\n#fqa-search .fqa-s-word-label {\r\n    padding: 0 4px;\r\n    border-radius: 3px;\r\n    background: var(--fqa-accent);\r\n    color: #fff;\r\n    font-size: 10px;\r\n    line-height: 15px;\r\n}\r\n\r\n#fqa-search .fqa-s-sugs {\r\n    display: grid;\r\n    grid-template-columns: repeat(6, minmax(0, 1fr));\r\n    gap: 20px 16px;\r\n}\r\n\r\n@media (max-width: 900px) {\r\n    #fqa-search .fqa-s-sugs {\r\n        grid-template-columns: repeat(4, minmax(0, 1fr));\r\n    }\r\n}\r\n\r\n@media (max-width: 600px) {\r\n    #fqa-search .fqa-s-sugs {\r\n        grid-template-columns: repeat(3, minmax(0, 1fr));\r\n    }\r\n}\r\n\r\n#fqa-search .fqa-s-sug {\r\n    cursor: pointer;\r\n    outline: none;\r\n}\r\n\r\n#fqa-search .fqa-s-sug-cover {\r\n    display: block;\r\n    width: 100%;\r\n    aspect-ratio: 3 / 4;\r\n    border-radius: 6px;\r\n    object-fit: cover;\r\n    background: var(--fqa-skeleton);\r\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\r\n}\r\n\r\n#fqa-search .fqa-s-sug:hover .fqa-s-sug-cover {\r\n    transform: translateY(-4px);\r\n    box-shadow: var(--fqa-shadow);\r\n}\r\n\r\n#fqa-search .fqa-s-sug-title {\r\n    margin-top: 7px;\r\n    font-size: 13px;\r\n    line-height: 19px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-search .fqa-s-sug-sub {\r\n    margin-top: 2px;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#fqa-search .fqa-s-landing-sk {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 8px;\r\n}\r\n\r\n#fqa-search .fqa-sk-chip {\r\n    width: 84px;\r\n    height: 32px;\r\n    border-radius: 999px;\r\n    background: var(--fqa-skeleton);\r\n}\r\n\r\n/* ------------------------------ 骨架 / 状态 ------------------------------ */\r\n\r\n#fqa-search .fqa-sk-cover {\r\n    flex: 0 0 96px;\r\n    width: 96px;\r\n    aspect-ratio: 3 / 4;\r\n    border-radius: 6px;\r\n    background: var(--fqa-skeleton);\r\n}\r\n\r\n#fqa-search .fqa-sk-line {\r\n    height: 12px;\r\n    margin-bottom: 9px;\r\n    border-radius: 4px;\r\n    background: var(--fqa-skeleton);\r\n}\r\n\r\n#fqa-search .fqa-sk-anim {\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n\r\n#fqa-search .fqa-sk-anim::after {\r\n    content: '';\r\n    position: absolute;\r\n    inset: 0;\r\n    transform: translateX(-100%);\r\n    background: linear-gradient(90deg, transparent, var(--fqa-skeleton-hl), transparent);\r\n    animation: fqa-shimmer 1.4s infinite;\r\n}\r\n\r\n#fqa-search .fqa-s-status {\r\n    padding: 72px 16px;\r\n    text-align: center;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 14px;\r\n    line-height: 22px;\r\n}\r\n\r\n#fqa-search .fqa-s-status-title {\r\n    margin-bottom: 8px;\r\n    color: var(--fqa-text);\r\n    font-size: 16px;\r\n    font-weight: 500;\r\n}\r\n\r\n#fqa-search .fqa-s-status .fqa-s-submit {\r\n    margin-top: 16px;\r\n}\r\n\r\n#fqa-search .fqa-s-loadmore {\r\n    padding: 24px 0;\r\n    text-align: center;\r\n    color: var(--fqa-text-weak);\r\n    font-size: 13px;\r\n}\r\n\r\n#fqa-search .fqa-s-inline-error {\r\n    padding: 12px 0;\r\n    text-align: center;\r\n    color: #f5222d;\r\n    font-size: 13px;\r\n}\r\n\r\n#fqa-search .fqa-s-privacy {\r\n    margin-top: 24px;\r\n    padding-top: 16px;\r\n    border-top: 1px solid var(--fqa-border);\r\n    color: var(--fqa-text-weak);\r\n    font-size: 12px;\r\n    line-height: 18px;\r\n    text-align: center;\r\n}\r\n\r\n/* ------------------------------- 深色模式 ------------------------------- */\r\n\r\n@media (prefers-color-scheme: dark) {\r\n    #fqa-search {\r\n        --fqa-text: #e6e6e6;\r\n        --fqa-text-sub: #a6a6a6;\r\n        --fqa-text-weak: #7a7a7a;\r\n        --fqa-border: rgba(255, 255, 255, 0.1);\r\n        --fqa-hover: rgba(255, 255, 255, 0.06);\r\n        --fqa-skeleton: rgba(255, 255, 255, 0.08);\r\n        --fqa-skeleton-hl: rgba(255, 255, 255, 0.14);\r\n        --fqa-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);\r\n        --fqa-card-bg: #212125;\r\n    }\r\n}\r\n";
  const CONTAINER_ID$1 = "fqa-search-root";
  const STYLE_ID$2 = "fqa-search-style";
  const RESULT_SELECTOR = ".muye-search";
  const NOTFOUND_SELECTOR = ".muye-undefined";
  const ORIGIN_SELECTOR = `${RESULT_SELECTOR}, ${NOTFOUND_SELECTOR}`;
  let app$1 = null;
  let container$1 = null;
  let observer$1 = null;
  let stopTitleWatch = null;
  function injectStyle$2() {
    if (document.getElementById(STYLE_ID$2)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID$2;
    style.textContent = searchcss;
    document.head.appendChild(style);
  }
  function isSearchPath(path) {
    return path === "/search" || path === "/search/" || path.startsWith("/search/");
  }
  function hideOrigin(root = document) {
    root.querySelectorAll(ORIGIN_SELECTOR).forEach((el) => {
      if (el.id === CONTAINER_ID$1 || el.closest(`#${CONTAINER_ID$1}`)) return;
      el.classList.add("fqa-hide");
    });
  }
  function unmount() {
    observer$1 == null ? void 0 : observer$1.disconnect();
    observer$1 = null;
    stopTitleWatch == null ? void 0 : stopTitleWatch();
    stopTitleWatch = null;
    app$1 == null ? void 0 : app$1.unmount();
    app$1 = null;
    container$1 == null ? void 0 : container$1.remove();
    container$1 = null;
    document.querySelectorAll(ORIGIN_SELECTOR).forEach((el) => {
      el.classList.remove("fqa-hide");
    });
  }
  async function mainHook$1(_previous) {
    const path = window.location.pathname;
    if (!isSearchPath(path) || !settings$1.enhanceSearch) {
      unmount();
      return;
    }
    syncFromUrl(path);
    if (app$1) {
      hideOrigin();
      return;
    }
    injectStyle$2();
    const origin = await waitForElement(ORIGIN_SELECTOR, 8e3);
    if (!isSearchPath(window.location.pathname)) return;
    if (app$1) return;
    hideOrigin();
    mount(origin);
    observer$1 = new MutationObserver((mutations) => {
      var _a;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.id === CONTAINER_ID$1 || node.closest(`#${CONTAINER_ID$1}`)) continue;
          if ((_a = node.matches) == null ? void 0 : _a.call(node, ORIGIN_SELECTOR)) {
            node.classList.add("fqa-hide");
          } else {
            hideOrigin(node);
          }
        }
      }
    });
    observer$1.observe(document.body, { childList: true, subtree: true });
  }
  function mount(origin) {
    container$1 = document.createElement("div");
    container$1.id = CONTAINER_ID$1;
    if (origin == null ? void 0 : origin.parentElement) {
      origin.insertAdjacentElement("beforebegin", container$1);
    } else {
      const anchor = document.querySelector("#root") ?? document.body;
      anchor.appendChild(container$1);
    }
    app$1 = vue.createApp(_sfc_main$1);
    app$1.config.errorHandler = (err, _instance, info) => {
      console.error(`[fqa:search] Vue error (${info}):`, err);
    };
    app$1.mount(container$1);
    stopTitleWatch = vue.watch(
      routeQuery,
      (q) => {
        document.title = q ? `${q} - 搜索 - 番茄小说` : "搜索 - 番茄小说";
      },
      { immediate: true }
    );
    console.log("[fqa:search] 搜索视图已挂载:", routeQuery.value || "(落地页)");
  }
  function filter$1(path, _query, _hash) {
    return isSearchPath(path) || !!app$1;
  }
  async function overloadTitle(_previous) {
    const searchKey = routeQuery.value || "搜索";
    document.title = `${searchKey} - 番茄小说`;
  }
  const _exports$1 = [
    {
      id: "searchHook_onload",
      event: "load",
      filter: filter$1,
      handler: mainHook$1
    },
    {
      id: "searchHook_onurlchange",
      event: "onUrlChange",
      filter: filter$1,
      handler: mainHook$1
    },
    {
      id: "searchHook_e",
      event: "enter",
      filter: filter$1,
      handler: overloadTitle
    }
  ];
  const downloadcss = "/* 下载进度弹窗 */\r\n\r\n.fqa-dl-mask {\r\n    position: fixed;\r\n    inset: 0;\r\n    z-index: 2147483300;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    background: rgba(0, 0, 0, 0.45);\r\n    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial,\r\n        sans-serif;\r\n    font-size: 14px;\r\n    line-height: 1.6;\r\n}\r\n\r\n.fqa-dl-box {\r\n    --fqa-dl-bg: #fff;\r\n    --fqa-dl-text: #1f2329;\r\n    --fqa-dl-sub: #8f959e;\r\n    --fqa-dl-border: rgba(31, 35, 41, 0.1);\r\n    --fqa-dl-accent: #ff6f3d;\r\n    --fqa-dl-track: rgba(31, 35, 41, 0.08);\r\n    --fqa-dl-danger: #f53f3f;\r\n\r\n    box-sizing: border-box;\r\n    width: min(420px, 90vw);\r\n    padding: 22px 24px 18px;\r\n    background: var(--fqa-dl-bg);\r\n    color: var(--fqa-dl-text);\r\n    border-radius: 12px;\r\n    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.24);\r\n}\r\n\r\n.fqa-dl-title {\r\n    margin: 0 0 4px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n}\r\n\r\n/* 正在处理的章节名，长标题截断 */\r\n.fqa-dl-sub {\r\n    margin: 0 0 14px;\r\n    min-height: 20px;\r\n    color: var(--fqa-dl-sub);\r\n    font-size: 12px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n}\r\n\r\n.fqa-dl-bar {\r\n    height: 8px;\r\n    border-radius: 4px;\r\n    background: var(--fqa-dl-track);\r\n    overflow: hidden;\r\n}\r\n\r\n.fqa-dl-fill {\r\n    height: 100%;\r\n    border-radius: 4px;\r\n    background: var(--fqa-dl-accent);\r\n    transition: width 0.2s ease;\r\n}\r\n\r\n/* 总量未知时的循环动画 */\r\n.fqa-dl-fill-indeterminate {\r\n    width: 35% !important;\r\n    animation: fqa-dl-slide 1.1s ease-in-out infinite;\r\n}\r\n\r\n@keyframes fqa-dl-slide {\r\n    0% {\r\n        margin-left: -35%;\r\n    }\r\n    100% {\r\n        margin-left: 100%;\r\n    }\r\n}\r\n\r\n.fqa-dl-meta {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-top: 8px;\r\n    color: var(--fqa-dl-sub);\r\n    font-size: 12px;\r\n    font-variant-numeric: tabular-nums;\r\n}\r\n\r\n.fqa-dl-error {\r\n    margin: 12px 0 0;\r\n    padding: 8px 10px;\r\n    border-radius: 6px;\r\n    background: rgba(245, 63, 63, 0.1);\r\n    color: var(--fqa-dl-danger);\r\n    font-size: 12px;\r\n    word-break: break-all;\r\n}\r\n\r\n.fqa-dl-actions {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    gap: 8px;\r\n    margin-top: 18px;\r\n}\r\n\r\n.fqa-dl-btn {\r\n    padding: 7px 18px;\r\n    border: 1px solid var(--fqa-dl-border);\r\n    border-radius: 6px;\r\n    background: var(--fqa-dl-bg);\r\n    color: var(--fqa-dl-text);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    cursor: pointer;\r\n}\r\n\r\n.fqa-dl-btn:hover {\r\n    border-color: var(--fqa-dl-accent);\r\n    color: var(--fqa-dl-accent);\r\n}\r\n\r\n.fqa-dl-btn:disabled {\r\n    color: var(--fqa-dl-sub);\r\n    border-color: var(--fqa-dl-border);\r\n    cursor: not-allowed;\r\n}\r\n\r\n.fqa-dl-btn-primary {\r\n    border-color: var(--fqa-dl-accent);\r\n    background: var(--fqa-dl-accent);\r\n    color: #fff;\r\n}\r\n\r\n.fqa-dl-btn-primary:hover {\r\n    background: #ff8a5f;\r\n    border-color: #ff8a5f;\r\n    color: #fff;\r\n}\r\n\r\n/**\r\n * 详情页注入的下载按钮。\r\n *\r\n * 原站 .info-btn / .add-bookshelf-btn 自带 `position:absolute; bottom:0` 和固定\r\n * 尺寸，但这两个 class 同时带页面行为（会被站点脚本当成自己的按钮），所以不能照抄。\r\n * 这里复刻它们的尺寸，水平位置由脚本按前面按钮的实际宽度算出来。\r\n */\r\n.fqa-dl-entry {\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 150px;\r\n    height: 40px;\r\n    line-height: 40px;\r\n    padding: 0;\r\n    border-radius: 4px;\r\n    font-size: 16px;\r\n    text-align: center;\r\n}\r\n\r\n@media (prefers-color-scheme: dark) {\r\n    .fqa-dl-box {\r\n        --fqa-dl-bg: #23272e;\r\n        --fqa-dl-text: #e5e6eb;\r\n        --fqa-dl-border: rgba(255, 255, 255, 0.12);\r\n        --fqa-dl-track: rgba(255, 255, 255, 0.12);\r\n    }\r\n}\r\n";
  const STYLE_ID$1 = "fqa-download-style";
  const ENTRY_CLASS = "fqa-dl-entry";
  const ANCHOR_SELECTOR = `.add-bookshelf-btn:not(.${ENTRY_CLASS}), .info-btn:not(.${ENTRY_CLASS})`;
  let observer = null;
  function injectStyle$1() {
    if (document.getElementById(STYLE_ID$1)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID$1;
    style.textContent = downloadcss;
    document.head.appendChild(style);
  }
  function parseBookId(path) {
    var _a;
    return ((_a = path.match(/^\/page\/(\d+)/)) == null ? void 0 : _a[1]) ?? "";
  }
  function isPagePath(path) {
    return /^\/page\/\d+/.test(path);
  }
  const FUNCTIONAL_CLASSES = ["add-bookshelf-btn", "info-btn"];
  const BUTTON_GAP = 10;
  function createButton(anchor, bookId2) {
    const btn = document.createElement("button");
    btn.type = "button";
    const classes = Array.from(anchor.classList).filter((c) => !FUNCTIONAL_CLASSES.includes(c));
    btn.className = [...classes, ENTRY_CLASS].join(" ");
    const span = document.createElement("span");
    span.textContent = "下载";
    btn.appendChild(span);
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      void startDownload(bookId2, { format: settings$1.downloadFormat });
    });
    return btn;
  }
  function placeButton(btn, siblings) {
    let right = 0;
    for (const el of siblings) {
      if (el === btn) continue;
      right = Math.max(right, el.offsetLeft + el.offsetWidth);
    }
    const left = `${right + BUTTON_GAP}px`;
    if (btn.style.left === left) return;
    btn.style.position = "absolute";
    btn.style.bottom = "0";
    btn.style.left = left;
  }
  function inject(bookId2) {
    const anchors = Array.from(document.querySelectorAll(ANCHOR_SELECTOR));
    if (anchors.length === 0) return;
    const existing = document.querySelector(`.${ENTRY_CLASS}`);
    if (existing) {
      placeButton(existing, anchors);
      return;
    }
    const anchor = anchors[anchors.length - 1];
    if (!anchor.parentElement) return;
    const btn = createButton(anchor, bookId2);
    anchor.insertAdjacentElement("afterend", btn);
    placeButton(btn, anchors);
  }
  function teardown() {
    observer == null ? void 0 : observer.disconnect();
    observer = null;
    document.querySelectorAll(`.${ENTRY_CLASS}`).forEach((el) => el.remove());
  }
  async function mainHook(_previous) {
    const path = window.location.pathname;
    if (!isPagePath(path) || !settings$1.enableDownload) {
      teardown();
      return;
    }
    const bookId2 = parseBookId(path);
    if (!bookId2) return;
    injectStyle$1();
    teardown();
    await waitForElement(ANCHOR_SELECTOR, 8e3);
    if (window.location.pathname !== path) return;
    inject(bookId2);
    observer = new MutationObserver(() => {
      if (window.location.pathname !== path) return;
      inject(bookId2);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  function filter(path, _query, _hash) {
    return isPagePath(path) || Boolean(observer);
  }
  const _exports = [
    {
      id: "downloadHook_onload",
      event: "load",
      filter,
      handler: mainHook
    },
    {
      id: "downloadHook_onurlchange",
      event: "onUrlChange",
      filter,
      handler: mainHook
    }
  ];
  const hooks = [
    ..._exports$4,
    ..._exports$5,
    ..._exports$3,
    ..._exports$2,
    ..._exports$1,
    ..._exports
  ];
  async function onEvent(event, previous) {
    console.log(`onEvent, event: ${event}, previous: ${previous}`);
    const path = window.location.pathname;
    const hash2 = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const tasks = [];
    for (const hook of hooks) {
      if (hook.event === event && hook.filter(path, params, hash2)) {
        tasks.push(async () => {
          try {
            await hook.handler(previous);
          } catch (err) {
            console.error(`[hook:${hook.id}] handler failed:`, err);
          }
        });
      }
    }
    console.log(`tasks: `, tasks);
    if (tasks.length > 0) {
      await Promise.allSettled(tasks.map((task) => task()));
    }
  }
  async function onUrlChange(previous) {
    return await onEvent("onUrlChange", previous);
  }
  async function onHashChange(previous) {
    return await onEvent("onHashChange", previous);
  }
  async function onLoad() {
    return await onEvent("load");
  }
  async function onEnter() {
    return await onEvent("enter");
  }
  const _hoisted_1 = { class: "fqa-dl-mask" };
  const _hoisted_2 = {
    class: "fqa-dl-box",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "下载进度"
  };
  const _hoisted_3 = { class: "fqa-dl-title" };
  const _hoisted_4 = { class: "fqa-dl-sub" };
  const _hoisted_5 = { class: "fqa-dl-bar" };
  const _hoisted_6 = { class: "fqa-dl-meta" };
  const _hoisted_7 = { key: 0 };
  const _hoisted_8 = {
    key: 0,
    class: "fqa-dl-error"
  };
  const _hoisted_9 = { class: "fqa-dl-actions" };
  const _hoisted_10 = ["disabled"];
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "DownloadProgress",
    props: {
      task: {}
    },
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const progress = vue.ref(props.task.snapshot);
      const stop = props.task.subscribe((p) => progress.value = p);
      vue.onBeforeUnmount(stop);
      const percent = vue.computed(() => {
        const { current, total } = progress.value;
        if (total <= 0) return 0;
        return Math.min(100, Math.round(current / total * 100));
      });
      const indeterminate = vue.computed(() => progress.value.total <= 0 && !progress.value.done);
      function cancel() {
        props.task.cancel();
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createElementVNode("div", _hoisted_2, [
            vue.createElementVNode("h3", _hoisted_3, vue.toDisplayString(progress.value.title), 1),
            vue.createElementVNode("p", _hoisted_4, vue.toDisplayString(progress.value.subtitle), 1),
            vue.createElementVNode("div", _hoisted_5, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(["fqa-dl-fill", { "fqa-dl-fill-indeterminate": indeterminate.value }]),
                style: vue.normalizeStyle({ width: `${percent.value}%` })
              }, null, 6)
            ]),
            vue.createElementVNode("div", _hoisted_6, [
              vue.createElementVNode("span", null, vue.toDisplayString(indeterminate.value ? "" : `${percent.value}%`), 1),
              progress.value.total > 0 && !progress.value.percentOnly ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, vue.toDisplayString(progress.value.current) + "/" + vue.toDisplayString(progress.value.total), 1)) : vue.createCommentVNode("", true)
            ]),
            progress.value.error ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_8, vue.toDisplayString(progress.value.error), 1)) : vue.createCommentVNode("", true),
            vue.createElementVNode("div", _hoisted_9, [
              !progress.value.done ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "fqa-dl-btn",
                disabled: progress.value.cancelled,
                onClick: cancel
              }, vue.toDisplayString(progress.value.cancelled ? "正在停止…" : "取消"), 9, _hoisted_10)) : vue.createCommentVNode("", true),
              progress.value.cancelled && !progress.value.done ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 1,
                class: "fqa-dl-btn",
                onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
              }, " 关闭 ")) : vue.createCommentVNode("", true),
              progress.value.done ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 2,
                class: "fqa-dl-btn fqa-dl-btn-primary",
                onClick: _cache[1] || (_cache[1] = ($event) => emit("close"))
              }, " 确定 ")) : vue.createCommentVNode("", true)
            ])
          ])
        ]);
      };
    }
  });
  const CONTAINER_ID = "fqa-download-root";
  const STYLE_ID = "fqa-download-style";
  let app = null;
  let container = null;
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = downloadcss;
    document.head.appendChild(style);
  }
  function close() {
    app == null ? void 0 : app.unmount();
    app = null;
    container == null ? void 0 : container.remove();
    container = null;
  }
  function dismiss() {
    close();
    clearFinishedTask();
  }
  function open(task) {
    if (app) return;
    injectStyle();
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
    app = vue.createApp({
      render: () => vue.h(_sfc_main, { task, onClose: dismiss })
    });
    app.config.errorHandler = (err, _instance, info) => {
      console.error(`[fqa:download] Vue error (${info}):`, err);
    };
    app.mount(container);
  }
  function initDownloadPanel() {
    onTaskChange((task) => {
      if (task) open(task);
      else close();
    });
  }
  const win = unsafeWindow;
  let previousUrl = win.location.href;
  let previousHash = win.location.hash;
  function installNavigationHooks() {
    for (const method of ["pushState", "replaceState"]) {
      const original = win.history[method];
      win.history[method] = function(...args) {
        const result = original.apply(this, args);
        console.debug(`history.${method} called with args:`, args);
        void onUrlChange(previousUrl);
        previousUrl = win.location.href;
        return result;
      };
    }
    win.addEventListener("popstate", () => {
      void onUrlChange(previousUrl);
      previousUrl = win.location.href;
    });
    win.addEventListener("hashchange", () => {
      void onHashChange(previousHash);
      previousHash = win.location.hash;
    });
  }
  async function mainInit() {
    console.log(`================================================`);
    console.log(`==          ${name} - ${version}         ==`);
    console.log(`================================================`);
    installNavigationHooks();
    void onEnter();
    initFontDecrypt();
    await inject$1();
    initUserStyle();
    initDownloadPanel();
    await ensureDevice();
    await init();
    void onLoad();
  }
  mainInit();

})(Vue, moment, JSZip);