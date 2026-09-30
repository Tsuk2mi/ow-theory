import fs from 'node:fs';
import {marked} from 'marked';
const root=new URL('../',import.meta.url);
const output=fs.existsSync(new URL('styles.css',root))?root:new URL('dist/',root);
fs.mkdirSync(output,{recursive:true});
const items=JSON.parse(fs.readFileSync(new URL('content/videos.json',root),'utf8'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cats=['交战与资源','站位与空间','信息与目标','瞄准与移动','学习与复盘','团队与角色','实战案例','背景与说明'];
const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';
const rows=items.map(x=>`<article class="entry" data-category="${esc(x.category)}" data-status="${x.status}" data-search="${esc([x.title,x.original,x.brief,x.category,x.body].join(' ').toLowerCase())}" id="${x.id}">
<details><summary>
<span class="entry-index">${String(x.index).padStart(2,'0')}</span>
<span class="entry-category">${esc(x.category)}<span class="state ${x.status==='待续'?'pending':''}">${x.status}</span></span>
<span class="entry-main"><span class="entry-title">${esc(x.title)}</span><span class="original" lang="${/[가-힣]/.test(x.original)?'ko':'en'}">${esc(x.original)}</span><span class="brief">${esc(x.brief)}</span></span>
<span class="expand"><span>正文</span><span class="plus" aria-hidden="true"></span></span>
</summary><div class="article-panel">
<div class="article-info"><span class="eyebrow">READING / ${String(x.index).padStart(2,'0')}</span><p>原作者<br><strong>위자드형<br>WizardHyeong</strong></p><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">观看原视频</a><p class="source-note">中文正文为字幕内容的整理摘要，非逐字转录。案例与版本条件按原文保留。</p></div>
<div class="prose">${marked.parse(x.body,{gfm:true})}</div>
</div></details></article>`).join('\n');
const nav=cats.map((c,i)=>`<button class="category-button" data-filter="${c}" aria-pressed="false"><span class="cat-num">${String(i+1).padStart(2,'0')}</span><span>${c}</span><span class="cat-count">${items.filter(x=>x.category===c).length}</span></button>`).join('');
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="他山之玉：WizardHyeong 52条公开视频目录与51条中文整理摘要。按交战资源、站位、信息、瞄准、学习等类型查阅完整正文。"><meta name="theme-color" content="#f5f2eb"><title>他山之玉 · 守望先锋理论资料库</title><link rel="icon" href="./favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="./styles.css"><script src="./app.js" defer></script></head>
<body><a class="skip" href="#catalog">跳到资料列表</a>
<header class="masthead"><a class="brand" href="./"><span class="brand-mark">玉</span><span>守望先锋竞技学<span class="brand-en">OVERWATCH STUDIES</span></span></a><span class="edition">他山之玉系列 / VOL. 01</span><a class="source-link" href="https://www.youtube.com/@wizardhyeong/videos" target="_blank" rel="noopener noreferrer">原作者频道</a></header>
<main><section class="intro" aria-labelledby="page-title"><div><p class="eyebrow">WIZARDHYEONG / VIDEO ARCHIVE</p><h1 id="page-title">他山之玉<span>守望先锋理论资料库</span></h1><p class="intro-copy">把值得反复思考的游戏理解，整理成可以随时查阅的文字。</p></div><div class="issue"><span class="issue-no">51<span>/ 52</span></span><p>已整理 / 公开视频</p><span class="updated">更新至 2026.09.30</span></div></section>
<div class="layout"><aside class="sidebar" aria-label="资料类型"><div class="sidebar-top"><p class="eyebrow">CONTENTS</p><h2>按类型查阅</h2></div><nav><button class="category-button active" data-filter="全部" aria-pressed="true"><span class="cat-num">—</span><span>全部资料</span><span class="cat-count">52</span></button>${nav}</nav><p class="catalog-note">每篇归入一个主要类型。<br>正文保留跨主题的讨论。</p><div class="editor"><p class="eyebrow">COMPILED BY</p><p>守望先锋竞技学教父</p><span>忠实整理 · 保留原意</span></div></aside>
<section class="catalog" id="catalog" aria-labelledby="list-heading"><div class="toolbar"><div><p class="eyebrow">INDEX / <span id="category-label">ALL</span></p><h2 id="list-heading">全部资料 <span id="result-count">52</span></h2></div><label class="search">${icon}<input id="search" type="search" placeholder="搜索标题、概念或正文" aria-label="搜索标题、概念或正文"><span class="search-key" aria-hidden="true">⌕</span></label></div><div class="reading-note"><span class="note-label">阅读说明</span><p>列表为短摘要，展开可读完整整理正文。原视频中的个案、旧版数值与个人观察，保留其适用范围。</p></div><div class="list-head" aria-hidden="true"><span>编号</span><span>类型</span><span>标题 / 简要摘要</span><span>阅读</span></div><div id="entries">${rows}</div><div id="empty" hidden><h3>没有找到匹配的资料</h3><p>试试其他关键词，或查看全部类型。</p><button id="reset">清除筛选</button></div><div class="catalog-end"><span>END OF INDEX</span><span id="end-count">52 项资料</span></div></section></div></main>
<footer><div><strong>他山之玉</strong><p>原作者：위자드형 WizardHyeong · 中文整理：守望先锋竞技学教父</p></div><p>51 篇已整理 · 1 条待续<br>两条长直播仅整理可核验内容。</p></footer></body></html>`;
fs.writeFileSync(new URL('index.html',output),html);
fs.writeFileSync(new URL('favicon.svg',output),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#f5f2eb"/><text x="32" y="46" text-anchor="middle" font-size="46" fill="#9b493c" font-family="serif">玉</text></svg>');
// Only verified article text is included in the reusable source. Internal progress logs are excluded.
fs.writeFileSync(new URL('content/verified-source.md',root),'# WizardHyeong 公开视频整理摘要\n\n'+items.filter(x=>x.status!=='待续').map(x=>`## ${x.index}. ${x.original}\n\n${x.body}\n`).join('\n'));
console.log('Rendered 52 accessible native details entries.');

