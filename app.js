(()=>{
'use strict';
const entries=[...document.querySelectorAll('.entry')];
const buttons=[...document.querySelectorAll('[data-filter]')];
const search=document.querySelector('#search');
const count=document.querySelector('#result-count');
const end=document.querySelector('#end-count');
const label=document.querySelector('#category-label');
const heading=document.querySelector('#list-heading');
const empty=document.querySelector('#empty');
let category='全部';
function filter(){
 const query=search.value.trim().toLocaleLowerCase();
 let visible=0;
 for(const entry of entries){
  const match=(category==='全部'||entry.dataset.category===category)&&(!query||entry.dataset.search.includes(query));
  entry.hidden=!match;
  if(match)visible++;
 }
 count.textContent=String(visible);
 end.textContent=visible+' 项资料';
 heading.firstChild.textContent=(category==='全部'?'全部资料':category)+' ';
 label.textContent=category==='全部'?'ALL':category;
 empty.hidden=visible!==0;
 for(const button of buttons){
  const active=button.dataset.filter===category;
  button.classList.toggle('active',active);
  button.setAttribute('aria-pressed',String(active));
 }
}
buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filter();}));
search.addEventListener('input',filter);
document.querySelector('#reset').addEventListener('click',()=>{category='全部';search.value='';filter();search.focus();});
function revealHash(){
 let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
 const entry=entries.find(e=>e.id===id);
 if(!entry)return;
 category='全部';search.value='';filter();
 entry.querySelector('details').open=true;
 requestAnimationFrame(()=>entry.scrollIntoView({block:'start'}));
}
entries.forEach(entry=>entry.querySelector('details').addEventListener('toggle',event=>{
 if(event.target.open)history.replaceState(null,'','#'+entry.id);
}));
window.addEventListener('hashchange',revealHash);
if(location.hash)revealHash();
})();
