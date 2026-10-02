
(function(){
  // header shadow
  var h=document.querySelector('header.site');
  addEventListener('scroll',function(){h&&h.classList.toggle('scrolled',scrollY>8)},{passive:true});
  // mobile menu
  var b=document.querySelector('.burger'),m=document.querySelector('.mobile-menu');
  b&&b.addEventListener('click',function(){m.classList.toggle('open')});
  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  // counters
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    var el=e.target,end=parseFloat(el.dataset.count),dec=el.dataset.dec?1:0,suf=el.dataset.suffix||'',t0=null;
    function tick(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1),v=end*(0.2+0.8*p*p*(3-2*p)/1);
      el.textContent=(dec?(end*p).toFixed(1):Math.round(end*p))+suf;if(p<1)requestAnimationFrame(tick);else el.textContent=(dec?end.toFixed(1):end)+suf;}
    requestAnimationFrame(tick);
  })},{threshold:.4});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el)});
  // faq
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
    q.addEventListener('click',function(){
      var open=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null});
      if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });
})();
