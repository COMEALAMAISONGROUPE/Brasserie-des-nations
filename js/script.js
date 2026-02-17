"use strict";

   (()=>{
    const loader=document.getElementById('loader'),lYear=document.getElementById('lYear'),
          sw=document.querySelector('.site-wrap'),ho=document.querySelector('.hero-overlay'),nav=document.querySelector('nav');

    /* Protection sous-pages : si on arrive via un lien ancre (#section),
       on saute le loader pour ne pas bloquer/bugger les sous-pages */
    
    // === Mobile: skip loader entirely ===
    if(window.innerWidth<=768){
        loader.style.display='none';loader.classList.add('done');
        sw.classList.add('show');nav.classList.add('show');ho.classList.add('go');
    }
    // === Burger menu toggle ===
    (function(){
        var b=document.getElementById('burger'),d=document.getElementById('mobDrawer'),o=document.getElementById('mobOverlay');
        if(!b||!d)return;
        function tog(){var isOpen=d.classList.contains('open');b.classList.toggle('open');d.classList.toggle('open');if(o)o.classList.toggle('open');b.setAttribute('aria-expanded',String(!isOpen));document.body.style.overflow=isOpen?'':'hidden';}
        b.addEventListener('click',tog);
        if(o)o.addEventListener('click',tog);
        d.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){if(d.classList.contains('open'))tog();});});
    })();

    var _h=window.location.hash;
    if(_h && _h.length>1){
        loader.style.display='none';loader.classList.add('done');
        sw.classList.add('show');nav.classList.add('show');ho.classList.add('go');
        setTimeout(initStars,50);
    } else {
        let cnt=1956;
        setTimeout(()=>{const iv=setInterval(()=>{cnt++;lYear.textContent=cnt;
            if(cnt>=2026){clearInterval(iv);setTimeout(()=>{loader.classList.add('done');sw.classList.add('show');
                setTimeout(()=>nav.classList.add('show'),200);
                setTimeout(()=>ho.classList.add('go'),400);
                setTimeout(initStars,600);
            },500);}},22);},1000);
    }
        function initStars(){if(window.matchMedia("(pointer:coarse)").matches||window.innerWidth<=768)return;
            const cv=document.createElement('canvas');cv.id='stars-canvas';sw.appendChild(cv);
            const cx=cv.getContext('2d');let W,docH;
            function resize(){W=innerWidth;docH=Math.max(document.documentElement.scrollHeight,sw.scrollHeight);cv.width=W;cv.height=docH;}
            resize();addEventListener('resize',resize);let rT;addEventListener('scroll',()=>{clearTimeout(rT);rT=setTimeout(resize,300);},{passive:true});
            let mX=-999,mY=-999;
            addEventListener('mousemove',e=>{mX=e.clientX;mY=e.clientY+scrollY;});
            addEventListener('mouseleave',()=>{mX=-999;mY=-999;});
            const COUNT=50,stars=[];
            class St{constructor(h){this.sp(h,true);}
                sp(h,init){this.x=Math.random()*W;this.y=Math.random()*h;this.r=Math.random()*1.6+0.8;this.br=this.r;this.ph=Math.random()*Math.PI*2;this.ts=0.4+Math.random()*0.8;this.ma=0.12+Math.random()*0.35;this.a=init?0:this.ma;this.fi=init;this.dx=(Math.random()-0.5)*0.15;this.dy=-(0.03+Math.random()*0.08);this.wa=0.2+Math.random()*0.4;this.wf=0.1+Math.random()*0.2;this.ex=false;this.sk=[];this.pb=0;}
                up(t,h){if(this.ex){this.sk.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=0.04;s.vx*=0.99;s.vy*=0.99;s.life-=0.02;s.r*=0.994;});this.sk=this.sk.filter(s=>s.life>0);if(!this.sk.length)this.sp(h,false);return;}
                    if(this.fi){this.a=Math.min(this.a+0.004,this.ma);if(this.a>=this.ma)this.fi=false;}
                    this.a=this.ma*(0.2+0.8*(Math.sin(t*this.ts+this.ph)*0.5+0.5));
                    this.x+=this.dx+Math.sin(t*this.wf+this.ph)*this.wa;this.y+=this.dy;
                    const dx=this.x-mX,dy=this.y-mY,d=Math.hypot(dx,dy);
                    if(d<130){const f=(130-d)/130*0.5;this.x+=dx/d*f;this.y+=dy/d*f;if(this.pb<0.5)this.pb=1;}
                    if(this.pb>0){this.r=this.br*(1+this.pb*0.8);this.pb*=0.95;if(this.pb<0.01){this.pb=0;this.r=this.br;}}
                    if(this.y<-20){this.y=h+10;this.x=Math.random()*W;}if(this.y>h+20){this.y=-10;this.x=Math.random()*W;}if(this.x<-20)this.x=W+10;if(this.x>W+20)this.x=-10;}
                boom(){this.ex=true;this.sk=[];const n=10+Math.floor(Math.random()*10);for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=1.5+Math.random()*3.5;this.sk.push({x:this.x,y:this.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.5,r:this.br*(0.3+Math.random()*0.7),life:0.5+Math.random()*0.5,w:Math.random()>0.6});}}
                dr(cx){if(this.ex){this.sk.forEach(s=>{cx.globalAlpha=s.life*0.85;const c=s.w?'255,230,170':'201,169,97';cx.fillStyle='rgb('+c+')';cx.shadowColor='rgba('+c+',0.5)';cx.shadowBlur=s.r*5;cx.beginPath();cx.arc(s.x,s.y,Math.max(0.2,s.r),0,Math.PI*2);cx.fill();});cx.shadowBlur=0;return;}
                    cx.globalAlpha=this.a;cx.fillStyle='rgba(201,169,97,1)';cx.shadowColor='rgba(201,169,97,0.4)';cx.shadowBlur=this.r*3+this.pb*10;cx.beginPath();cx.arc(this.x,this.y,this.r,0,Math.PI*2);cx.fill();cx.shadowBlur=0;}}
            for(let i=0;i<COUNT;i++)stars.push(new St(docH));
            let t=0,lf=performance.now();
            function loop(now){const dt=(now-lf)/1000;lf=now;t+=dt;
                const vt=scrollY-200,vb=scrollY+innerHeight+200;
                cx.clearRect(0,vt,W,vb-vt+1);
                stars.forEach(s=>{s.up(t,docH);const sy=s.ex?(s.sk[0]?.y||s.y):s.y;if(sy>vt-50&&sy<vb+50)s.dr(cx);});
                cx.globalAlpha=1;requestAnimationFrame(loop);}
            requestAnimationFrame(loop);
            addEventListener('click',e=>{if(e.target.closest('nav,a,button,.menu-item,.simple-menu-item,.gi-inner'))return;
                const px=e.clientX,py=e.clientY+scrollY;let nr=null,md=60;
                stars.forEach(s=>{if(s.ex)return;const d=Math.hypot(s.x-px,s.y-py);if(d<md){md=d;nr=s;}});
                if(nr)nr.boom();else{const tmp=new St(docH);tmp.x=px;tmp.y=py;tmp.boom();stars.push(tmp);setTimeout(()=>{const i=stars.indexOf(tmp);if(i>-1&&stars.length>COUNT)stars.splice(i,1);},3000);}});
        }

        const galItems=document.querySelectorAll('.gallery-item[data-gi]');
        const galLine=document.querySelector('.gallery-line');
        const galObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){
            const i=parseInt(e.target.dataset.gi);
            const sweep=e.target.querySelector('.gi-sweep');
            if(sweep) sweep.style.animationDelay=(i*0.25)+'s';
            e.target.querySelector('.gi-inner img').style.transitionDelay=(i*0.2)+'s';
            e.target.classList.add('on');galObs.unobserve(e.target);
        }});},{threshold:0.05});
        galItems.forEach(g=>galObs.observe(g));
        if(galLine&&matchMedia('(pointer:fine)').matches){const lo=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');lo.unobserve(e.target);}});},{threshold:0.5});lo.observe(galLine);}
        if(matchMedia('(pointer:fine)').matches)galItems.forEach(gi=>{
            const inner=gi.querySelector('.gi-inner'),glow=gi.querySelector('.gi-glow');
            inner.addEventListener('mousemove',e=>{
                const r=inner.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,nx=x/r.width-0.5,ny=y/r.height-0.5;
                if(glow){glow.style.left=x+'px';glow.style.top=y+'px';}
                inner.style.transform='perspective(800px) rotateY('+(nx*4)+'deg) rotateX('+(-ny*4)+'deg)';
            });
            inner.addEventListener('mouseleave',()=>{inner.style.transform='';});
        });

        const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});},{threshold:0.1,rootMargin:'0px 0px -20px 0px'});
        function tag(s,t,d){document.querySelectorAll(s).forEach((el,i)=>{el.setAttribute('data-r',t);if(d)el.style.transitionDelay=d(i)+'s';io.observe(el);});}
        tag('.manifesto-text h2','l');tag('.manifesto-text p','u',i=>0.1+i*0.12);tag('.manifesto-image','r');
        tag('.menu-header','u');tag('.menu-item','s',i=>i*0.15);tag('.simple-menu-item','f',i=>(i%2)*0.12);
        tag('.gallery-header','u');
        tag('.heritage-content > *:not(.year):not(h2)','u',i=>0.3+i*0.15);
        tag('.contact-block','u',i=>i*0.15);
        document.querySelectorAll('.year,.category-title,.footer-logo,.section-star,.heritage-sep,.gal-divider,.loc-sep').forEach(el=>io.observe(el));

        const hH2=document.querySelector('.heritage h2');
        if(hH2){const pts=hH2.innerHTML.split(/(<br\s*\/?>)/);let h='',ci=0;pts.forEach(p=>{if(/<br/.test(p)){h+=p;return;}[...p].forEach(ch=>{if(ch===' ')h+=' ';else h+='<span class="ch" style="transition-delay:'+(ci++*0.025)+'s">'+ch+'</span>';});});hH2.innerHTML=h;const cio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.ch').forEach(c=>c.classList.add('on'));});},{threshold:0.3});cio.observe(hH2);}

        const heroH=innerHeight;
        const hOv=document.querySelector('.hero-overlay'),hVid=document.querySelector('.hero-video video');let tick=false;
        function onScroll(){if(tick)return;tick=true;requestAnimationFrame(()=>{const y=scrollY;
            if(y<heroH&&hOv){const r=y/heroH;hOv.style.transform='translateY('+y*0.4+'px)';hOv.style.opacity=1-r*1.3;if(hVid)hVid.style.transform='translate(-50%,-50%) scale('+(1+r*0.15)+')';}
            nav.classList.toggle('compact',y>80);
            const bar=document.querySelector('.scroll-bar');if(bar)bar.style.width=(y/(document.documentElement.scrollHeight-innerHeight)*100)+'%';tick=false;});}
        if(matchMedia('(pointer:fine)').matches)addEventListener('scroll',onScroll,{passive:true});
        document.querySelectorAll('.menu-item').forEach(c=>{const sh=document.createElement('div');sh.className='shine';c.appendChild(sh);c.addEventListener('mousemove',e=>{return;const x=(e.clientX-r.left)/r.width-0.5;const y=(e.clientY-r.top)/r.height-0.5;c.style.transform='translateY(-14px) perspective(700px) rotateY('+x*5+'deg) rotateX('+-y*5+'deg)';});c.addEventListener('mouseleave',()=>c.style.transform='');});
        document.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.classList.contains('pdj-nav-link'))return;a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});});
    })();
    

    (function(){
        try {
        var NS='http://www.w3.org/2000/svg';
        function safeRemove(el){if(el&&el.parentNode)el.parentNode.removeChild(el);}
        var thread=document.getElementById('goldenThread'),glow=document.getElementById('cursorGlow'),glowOn=false;
        if(glow)document.addEventListener('mousemove',function(e){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';var el=document.elementFromPoint(e.clientX,e.clientY);var inD=el&&el.closest('.gallery-full,.heritage,.location,.hero-video');if(inD&&!glowOn){glow.classList.add('visible');glowOn=true;}if(!inD&&glowOn){glow.classList.remove('visible');glowOn=false;}});
        var navLinks=document.querySelectorAll('.nav-link[href^="#"]'),secs=[];
        navLinks.forEach(function(l){var h=l.getAttribute('href');if(h&&h.charAt(0)==='#'){var el=document.querySelector(h);if(el)secs.push({el:el,link:l});}});
        var sBusy=false;
        window.addEventListener('scroll',function(){if(sBusy)return;sBusy=true;requestAnimationFrame(function(){var y=window.scrollY,dH=document.documentElement.scrollHeight-window.innerHeight;if(thread)thread.style.height=(dH>0?(y/dH)*100:0)+'%';var aId='';secs.forEach(function(sc){return;if(r.top<=window.innerHeight*.4&&r.bottom>0)aId=sc.el.id;});navLinks.forEach(function(l){if(l.getAttribute('href')==='#'+aId)l.classList.add('active');else l.classList.remove('active');});sBusy=false;});},{passive:true});
        document.querySelectorAll('.price[data-price]').forEach(function(el){var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var raw=el.dataset.price,num=parseFloat(raw.replace(',','.'));if(isNaN(num)){obs.unobserve(el);return;}var hc=raw.indexOf(',')!==-1,st=null;function tick(ts){if(!st)st=ts;var p=Math.min((ts-st)/800,1),ea=1-Math.pow(1-p,3),c=num*ea;if(hc){var pp=c.toFixed(2).split('.');el.textContent=pp[0]+','+pp[1];}else el.textContent=Math.round(c).toString();if(p<1)requestAnimationFrame(tick);else el.textContent=raw;}requestAnimationFrame(tick);obs.unobserve(el);});},{threshold:.5});obs.observe(el);});
        document.querySelectorAll('.ornament-sep').forEach(function(o){var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}});},{threshold:.5});obs.observe(o);});
        document.querySelectorAll('.simple-menu-item').forEach(function(item){if(!matchMedia('(pointer:fine)').matches)return;item.addEventListener('mousemove',function(e){var r=item.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;item.style.transform='translateY(-5px) perspective(600px) rotateY('+x*3+'deg) rotateX('+-y*3+'deg)';});item.addEventListener('mouseleave',function(){item.style.transform='';});});
        document.querySelectorAll('.food-illust').forEach(function(fi){var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}});},{threshold:.1});obs.observe(fi);});
        document.querySelectorAll('.category-icon[data-anim]').forEach(function(icon){var anim=icon.dataset.anim,g=icon.querySelector('g');if(!g)return;var busy=false;icon.addEventListener('click',function(ev){ev.stopPropagation();if(busy)return;busy=true;if(anim==='toque'){g.style.transition='transform .2s ease';g.style.transform='translateY(-8px)';setTimeout(function(){g.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';g.style.transform='';},200);for(var i=0;i<3;i++)(function(i){var c=document.createElementNS(NS,'circle');c.setAttribute('cx',String(32+i*8));c.setAttribute('cy','10');c.setAttribute('r','0');c.setAttribute('fill','none');c.setAttribute('stroke','var(--green)');c.setAttribute('stroke-width','0.8');c.setAttribute('opacity','0.6');g.appendChild(c);setTimeout(function(){c.style.transition='all 1s ease-out';c.setAttribute('r','4');c.setAttribute('cy','-5');c.setAttribute('opacity','0');setTimeout(function(){safeRemove(c);},1000);},i*150+100);})(i);setTimeout(function(){busy=false;},1200);}else if(anim==='cloche'){var ps=g.querySelectorAll('path'),dome=ps[0],handle=ps[1];if(!dome){busy=false;return;}dome.style.transition='transform .4s cubic-bezier(.16,1,.3,1)';dome.style.transformOrigin='40px 32px';dome.style.transform='translateY(-12px) rotate(-8deg)';if(handle){handle.style.transition=dome.style.transition;handle.style.transform=dome.style.transform;}var lns=g.querySelectorAll('line');for(var li=0;li<lns.length;li++){lns[li].style.transition='transform .3s ease '+li*.1+'s';lns[li].style.transform='scaleY(1.8) translateY(-4px)';}setTimeout(function(){dome.style.transition='transform .6s cubic-bezier(.34,1.56,.64,1)';dome.style.transform='';if(handle){handle.style.transition=dome.style.transition;handle.style.transform='';}for(var li=0;li<lns.length;li++){lns[li].style.transition='transform .4s ease';lns[li].style.transform='';}},800);setTimeout(function(){busy=false;},1500);}else if(anim==='viande'){var shk=0;function shakeIt(){if(shk>=8){g.style.transform='';busy=false;return;}g.style.transition='none';g.style.transform='translate('+(Math.random()*4-2)+'px,'+(Math.random()*2-1)+'px)';shk++;requestAnimationFrame(function(){setTimeout(shakeIt,40);});}shakeIt();for(var i=0;i<6;i++)(function(i){var l=document.createElementNS(NS,'line'),x=20+Math.random()*32;l.setAttribute('x1',String(x));l.setAttribute('y1','28');l.setAttribute('x2',String(x));l.setAttribute('y2','28');l.setAttribute('stroke','var(--green)');l.setAttribute('stroke-width','0.8');l.setAttribute('opacity','0.7');l.setAttribute('stroke-linecap','round');g.appendChild(l);setTimeout(function(){l.style.transition='all .8s ease-out';l.setAttribute('y2',String(14+Math.random()*8));l.setAttribute('opacity','0');setTimeout(function(){safeRemove(l);},800);},i*80);})(i);}else if(anim==='poisson'){var t=0;function swim(){t+=.15;g.style.transition='none';g.style.transformOrigin='40px 25px';g.style.transform='translateX('+Math.sin(t)*12+'px) translateY('+Math.sin(t*2)*4+'px) rotate('+Math.sin(t)*10+'deg)';if(t<Math.PI*4)requestAnimationFrame(swim);else{g.style.transition='transform .5s ease';g.style.transform='';busy=false;}}swim();for(var i=0;i<5;i++)(function(i){var c=document.createElementNS(NS,'circle');c.setAttribute('cx',String(8+Math.random()*10));c.setAttribute('cy','25');c.setAttribute('r',String(1+Math.random()*2));c.setAttribute('fill','none');c.setAttribute('stroke','var(--green)');c.setAttribute('stroke-width','0.6');c.setAttribute('opacity','0.5');g.appendChild(c);setTimeout(function(){c.style.transition='all 1.2s ease-out';c.setAttribute('cy',String(-5-Math.random()*10));c.setAttribute('opacity','0');setTimeout(function(){safeRemove(c);},1200);},i*200+100);})(i);}else if(anim==='salade'){var elems=[].slice.call(g.querySelectorAll('path')).concat([].slice.call(g.querySelectorAll('line')));elems.forEach(function(el,i){setTimeout(function(){el.style.transition='transform .2s ease';el.style.transformOrigin='40px 30px';el.style.transform='scale(1.15) rotate('+(Math.random()*10-5)+'deg)';setTimeout(function(){el.style.transition='transform .6s cubic-bezier(.34,1.56,.64,1)';el.style.transform='';},200);},i*120);});setTimeout(function(){busy=false;},elems.length*120+900);}else if(anim==='gateau'){var fl=document.createElementNS(NS,'ellipse');fl.setAttribute('cx','40');fl.setAttribute('cy','5');fl.setAttribute('rx','3');fl.setAttribute('ry','5');fl.setAttribute('fill','var(--green)');fl.setAttribute('opacity','0.3');g.appendChild(fl);var fk=0;function flickr(){fk++;fl.setAttribute('rx',String(2*(.7+Math.random()*.6)));fl.setAttribute('ry',String(4*(.8+Math.random()*.5)));fl.setAttribute('cx',String(40+Math.random()*2-1));if(fk<15)requestAnimationFrame(function(){setTimeout(flickr,60);});else{fl.style.transition='opacity .3s';fl.setAttribute('opacity','0');setTimeout(function(){safeRemove(fl);},300);}}flickr();setTimeout(function(){g.style.transition='transform .15s ease';g.style.transformOrigin='40px 50px';g.style.transform='scaleY(0.9) scaleX(1.05)';setTimeout(function(){g.style.transition='transform .6s cubic-bezier(.34,1.56,.64,1)';g.style.transform='';busy=false;},150);},600);}else if(anim==='boisson'){g.style.transition='transform .3s ease';g.style.transformOrigin='40px 48px';g.style.transform='rotate(-15deg)';setTimeout(function(){g.style.transition='transform .6s cubic-bezier(.34,1.56,.64,1)';g.style.transform='rotate(15deg)';setTimeout(function(){g.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';g.style.transform='';busy=false;},400);},300);for(var i=0;i<4;i++)(function(i){var c=document.createElementNS(NS,'circle');c.setAttribute('cx',String(36+Math.random()*8));c.setAttribute('cy','14');c.setAttribute('r','0');c.setAttribute('fill','none');c.setAttribute('stroke','var(--green)');c.setAttribute('stroke-width','0.6');c.setAttribute('opacity','0.5');g.appendChild(c);setTimeout(function(){c.style.transition='all 1s ease-out';c.setAttribute('r',String(2+Math.random()*3));c.setAttribute('cy',String(-2-Math.random()*8));c.setAttribute('opacity','0');setTimeout(function(){safeRemove(c);},1000);},i*150+100);})(i);}else if(anim==='cafe'){var steam=[];for(var i=0;i<3;i++)(function(i){var p=document.createElementNS(NS,'path');var sx=30+i*5;p.setAttribute('d','M'+sx+' 22 Q'+(sx-2)+' 16 '+(sx+2)+' 10 Q'+(sx-1)+' 4 '+sx+' -2');p.setAttribute('fill','none');p.setAttribute('stroke','var(--green)');p.setAttribute('stroke-width','0.8');p.setAttribute('opacity','0');p.setAttribute('stroke-linecap','round');g.appendChild(p);steam.push(p);setTimeout(function(){p.style.transition='opacity .6s ease, transform .8s ease';p.setAttribute('opacity','0.5');p.style.transform='translateY(-4px)';setTimeout(function(){p.style.transition='opacity .5s ease';p.setAttribute('opacity','0');setTimeout(function(){safeRemove(p);},500);},600);},i*200);})(i);g.style.transition='transform .15s ease';g.style.transform='translateY(-3px)';setTimeout(function(){g.style.transition='transform .4s cubic-bezier(.34,1.56,.64,1)';g.style.transform='';busy=false;},800);}else if(anim==='accomp'){g.style.transition='transform .2s ease';g.style.transformOrigin='40px 42px';g.style.transform='scale(1.1) rotate(5deg)';setTimeout(function(){g.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';g.style.transform='scale(1) rotate(-3deg)';setTimeout(function(){g.style.transition='transform .4s ease';g.style.transform='';busy=false;},300);},200);for(var i=0;i<5;i++)(function(i){var l=document.createElementNS(NS,'line');var a=Math.random()*Math.PI*2;l.setAttribute('x1','40');l.setAttribute('y1','35');l.setAttribute('x2','40');l.setAttribute('y2','35');l.setAttribute('stroke','var(--green)');l.setAttribute('stroke-width','0.8');l.setAttribute('opacity','0.6');l.setAttribute('stroke-linecap','round');g.appendChild(l);setTimeout(function(){l.style.transition='all .8s ease-out';l.setAttribute('x2',String(40+Math.cos(a)*16));l.setAttribute('y2',String(35+Math.sin(a)*12));l.setAttribute('opacity','0');setTimeout(function(){safeRemove(l);},800);},i*80);})(i);}else busy=false;});});
        var yearEl=document.querySelector('.year');if(yearEl){var eeActive=false;yearEl.style.cursor='pointer';yearEl.addEventListener('click',function(evt){evt.stopPropagation();evt.preventDefault();if(eeActive)return;eeActive=true;var W=window.innerWidth,H=window.innerHeight;var cvs=document.createElement('canvas');cvs.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;pointer-events:none';cvs.width=W*2;cvs.height=H*2;document.body.appendChild(cvs);var ctx=cvs.getContext('2d');ctx.scale(2,2);yearEl.style.transform='scale(1.1)';var PP=[],golds=[[201,169,97],[232,213,163],[245,243,239],[255,230,150],[180,150,70]];function bst(x,y,n,vMn,vMx,gr,dc){for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,v=vMn+Math.random()*(vMx-vMn),c=golds[Math.floor(Math.random()*golds.length)];PP.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,d:dc||.008+Math.random()*.008,s:1.5+Math.random()*3,c:c,g:gr||40});}}function rng(x,y,n,v){for(var i=0;i<n;i++){var a=(i/n)*Math.PI*2;PP.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,d:.012,s:2.5,c:golds[0],g:15});}}var rks=[];for(var r=0;r<5;r++)(function(r){var tx=W*.15+Math.random()*W*.7,ty=H*.15+Math.random()*H*.3;setTimeout(function(){rks.push({x:tx,y:H+20,tx:tx,ty:ty,done:false,trail:[]});},r*350);})(r);var yr=yearEl.getBoundingClientRect();for(var si=0;si<40;si++)(function(si){setTimeout(function(){bst(yr.left+Math.random()*yr.width,yr.top+Math.random()*yr.height,6,20,80,25,.02);},si*40);})(si);var t0=performance.now();function frame(now){var dt=Math.min((now-t0)/1e3,.05);t0=now;ctx.clearRect(0,0,W,H);for(var ri=0;ri<rks.length;ri++){var rk=rks[ri];if(rk.done)continue;var dy=rk.ty-rk.y;if(Math.abs(dy)<15){rk.done=true;bst(rk.tx,rk.ty,120,60,200,35,null);rng(rk.tx,rk.ty,30,140);(function(rk){setTimeout(function(){rng(rk.tx,rk.ty,20,90);bst(rk.tx,rk.ty,40,30,100,50,null);},200);})(rk);continue;}rk.y+=dy*.06;rk.trail.push({x:rk.x+Math.random()*4-2,y:rk.y,l:1});for(var ti=rk.trail.length-1;ti>=0;ti--){var tp=rk.trail[ti];tp.l-=.04;if(tp.l>0){ctx.beginPath();ctx.arc(tp.x,tp.y,1.5*tp.l,0,Math.PI*2);ctx.fillStyle='rgba(201,169,97,'+tp.l*.7+')';ctx.fill();}else rk.trail.splice(ti,1);}ctx.beginPath();ctx.arc(rk.x,rk.y,3,0,Math.PI*2);ctx.fillStyle='rgba(255,230,150,.95)';ctx.fill();ctx.beginPath();ctx.arc(rk.x,rk.y,8,0,Math.PI*2);ctx.fillStyle='rgba(255,230,150,.15)';ctx.fill();}for(var pi=PP.length-1;pi>=0;pi--){var p=PP[pi];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.g*dt;p.vx*=.995;p.life-=p.d;if(p.life<=0){PP.splice(pi,1);continue;}ctx.globalAlpha=p.life;ctx.beginPath();ctx.arc(p.x,p.y,p.s*p.life,0,Math.PI*2);ctx.fillStyle='rgb('+p.c[0]+','+p.c[1]+','+p.c[2]+')';ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,p.s*p.life*3,0,Math.PI*2);ctx.fillStyle='rgba('+p.c[0]+','+p.c[1]+','+p.c[2]+','+p.life*.12+')';ctx.fill();ctx.globalAlpha=1;}var act=PP.length>0;for(var ci=0;ci<rks.length;ci++){if(!rks[ci].done){act=true;break;}}if(act)requestAnimationFrame(frame);else{yearEl.style.transform='';setTimeout(function(){safeRemove(cvs);eeActive=false;},300);}}requestAnimationFrame(frame);setTimeout(function(){safeRemove(cvs);eeActive=false;yearEl.style.transform='';},10000);});}
        var grainEl=document.querySelector('.grain');if(grainEl){grainEl.style.opacity='0';setTimeout(function(){grainEl.style.transition='opacity 3s ease';grainEl.style.opacity='.025';},2000);}
        }catch(err){if(window.console&&console.warn)console.warn('Enhanced:',err);}
    })();

(function(){
    var USE_FIREBASE=false;
    var FIREBASE_CONFIG={apiKey:'',authDomain:'',databaseURL:'',projectId:''};
    var ADMIN_PASSWORD='brasserie2026';
    var db=null;
    var isAdmin=window.location.search.indexOf('admin')!==-1;
    var isLoggedIn=false;
    var STORAGE_KEY='bdn_menu_du_jour';
    var adminBtn=document.getElementById('pdjAdminBtn');
    var panel=document.getElementById('pdjPanel');
    var panelOvl=document.getElementById('pdjPanelOverlay');
    var pdjSection=document.querySelector('.plat-du-jour');
    var pdjNavLink=document.querySelector('.pdj-nav-link');
    if(isAdmin&&adminBtn)adminBtn.style.display='flex';
    document.querySelectorAll('.pdj-nav-link').forEach(function(pdjNavLink){pdjNavLink.addEventListener('click',function(e){
    e.preventDefault();
    if(pdjSection.classList.contains('pdj-visible')){
    pdjSection.classList.remove('pdj-visible');pdjSection.style.display='none';
    }else{
    pdjSection.style.display='';pdjSection.classList.add('pdj-visible');
    pdjSection.scrollIntoView({behavior:'smooth',block:'start'});
    }});});
    function initFirebase(cb){
    if(!USE_FIREBASE||!FIREBASE_CONFIG.apiKey)return cb();
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    s.onload=function(){var s2=document.createElement('script');
    s2.src='https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
    s2.onload=function(){firebase.initializeApp(FIREBASE_CONFIG);db=firebase.database();cb();};
    document.head.appendChild(s2);};document.head.appendChild(s);}
    function loadPdj(){
    if(USE_FIREBASE&&db){db.ref('menuDuJour').on('value',function(snap){renderPdj(snap.val());});
    }else{var d=localStorage.getItem(STORAGE_KEY);renderPdj(d?JSON.parse(d):null);}}
    function renderPdj(data){
    var dtEl=document.getElementById('pdjDate');
    var emptyEl=document.getElementById('pdjEmpty');
    var bfBloc=document.getElementById('pdjBreakfast');
    var luBloc=document.getElementById('pdjLunch');
    var deBloc=document.getElementById('pdjDessert');
    var sep1=document.getElementById('pdjSep1');
    var now=new Date();
    var jrs=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    var ms=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    dtEl.textContent=jrs[now.getDay()]+' '+now.getDate()+' '+ms[now.getMonth()]+' '+now.getFullYear();
    bfBloc.style.display='none';luBloc.style.display='none';deBloc.style.display='none';sep1.style.display='none';
    if(!data||data.visible===false){emptyEl.style.display='';return;}
    var hasContent=false;
    if(data.breakfast&&data.breakfast.on!==false&&data.breakfast.items&&data.breakfast.items.trim()){
    document.getElementById('pdjBreakfastHeader').textContent=data.breakfast.header||'PETIT DÉJEUNER';
    renderItems('pdjBreakfastItems',data.breakfast.items);bfBloc.style.display='';hasContent=true;}
    if(data.lunch&&data.lunch.on!==false&&data.lunch.items&&data.lunch.items.trim()){
    document.getElementById('pdjLunchHeader').textContent=data.lunch.header||'PLATS DU JOUR';
    renderItems('pdjLunchItems',data.lunch.items);luBloc.style.display='';if(hasContent)sep1.style.display='';hasContent=true;}
    if(data.dessert&&data.dessert.on!==false&&data.dessert.items&&data.dessert.items.trim()){
    document.getElementById('pdjDessertHeader').textContent=data.dessert.header||'DESSERT';
    renderItems('pdjDessertItems',data.dessert.items);deBloc.style.display='';hasContent=true;}
    if(hasContent){emptyEl.style.display='none';}else{emptyEl.style.display='';}}
    function renderItems(cid,text){var c=document.getElementById(cid);c.innerHTML='';
    var lines=text.split('\n');for(var i=0;i<lines.length;i++){var l=lines[i].trim();if(!l)continue;
    var div=document.createElement('div');div.className='pdj-bloc-item';div.textContent=l;c.appendChild(div);}}
    function savePdj(data){if(USE_FIREBASE&&db){db.ref('menuDuJour').set(data);}else{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));renderPdj(data);}}
    function buildDataFromForm(){return{
    visible:document.getElementById('pdjMasterToggle').classList.contains('on'),
    breakfast:{on:document.querySelector('[data-section="breakfast"]').classList.contains('on'),
    header:document.getElementById('pdjInBreakfastHeader').value.trim(),
    items:document.getElementById('pdjInBreakfastItems').value.trim()},
    lunch:{on:document.querySelector('[data-section="lunch"]').classList.contains('on'),
    header:document.getElementById('pdjInLunchHeader').value.trim(),
    items:document.getElementById('pdjInLunchItems').value.trim()},
    dessert:{on:document.querySelector('[data-section="dessert"]').classList.contains('on'),
    header:document.getElementById('pdjInDessertHeader').value.trim(),
    items:document.getElementById('pdjInDessertItems').value.trim()},
    updatedAt:new Date().toISOString()};}
    var liveTimer=null;
    function triggerLivePreview(){clearTimeout(liveTimer);liveTimer=setTimeout(function(){
    var data=buildDataFromForm();renderPdj(data);
    if(!pdjSection.classList.contains('pdj-visible')){pdjSection.style.display='';pdjSection.classList.add('pdj-visible');}},150);}
    function attachLivePreview(){var inputs=panel.querySelectorAll('input[type="text"],textarea');
    for(var i=0;i<inputs.length;i++){inputs[i].addEventListener('input',triggerLivePreview);}}
    var savedDataBeforeEdit=null;
    window.closePdjModals=function(){document.getElementById('pdjLoginModal').classList.remove('active');
    panel.classList.remove('open');panelOvl.classList.remove('active');
    if(pdjSection)pdjSection.classList.remove('pdj-editing');};
    function cancelEdit(){if(savedDataBeforeEdit!==undefined)renderPdj(savedDataBeforeEdit);closePdjModals();}
    window.pdjLogin=function(){var pwd=document.getElementById('pdjPassword').value;
    if(pwd===ADMIN_PASSWORD){isLoggedIn=true;document.getElementById('pdjLoginModal').classList.remove('active');openPanel();
    }else{document.getElementById('pdjLoginMsg').style.display='block';}};
    function openPanel(){var raw;
    if(USE_FIREBASE&&db){db.ref('menuDuJour').once('value').then(function(snap){savedDataBeforeEdit=snap.val();fillForm(savedDataBeforeEdit);});
    }else{raw=localStorage.getItem(STORAGE_KEY);savedDataBeforeEdit=raw?JSON.parse(raw):null;fillForm(savedDataBeforeEdit);}
    panel.classList.add('open');panelOvl.classList.add('active');
    if(pdjSection)pdjSection.classList.add('pdj-editing');
    if(!pdjSection.classList.contains('pdj-visible')){pdjSection.style.display='';pdjSection.classList.add('pdj-visible');}
    pdjSection.scrollIntoView({behavior:'smooth',block:'center'});}
    function fillForm(data){var mt=document.getElementById('pdjMasterToggle');
    if(data&&data.visible===false)mt.classList.remove('on');else mt.classList.add('on');
    var sections=['breakfast','lunch','dessert'];
    for(var i=0;i<sections.length;i++){var s=sections[i];var cap=s.charAt(0).toUpperCase()+s.slice(1);
    var hI=document.getElementById('pdjIn'+cap+'Header');var iI=document.getElementById('pdjIn'+cap+'Items');
    var tg=document.querySelector('[data-bloc="'+s+'"] [data-section="'+s+'"]');
    if(data&&data[s]){if(hI)hI.value=data[s].header||'';if(iI)iI.value=data[s].items||'';
    if(tg){if(data[s].on===false)tg.classList.remove('on');else tg.classList.add('on');}
    }else{if(hI)hI.value='';if(iI)iI.value='';if(tg)tg.classList.add('on');}}
    updateBlocStates();}
    function updateBlocStates(){var on=document.getElementById('pdjMasterToggle').classList.contains('on');
    var b=document.querySelectorAll('.pdj-edit-bloc');for(var i=0;i<b.length;i++){if(!on)b[i].classList.add('disabled');else b[i].classList.remove('disabled');}}
    if(adminBtn){adminBtn.addEventListener('click',function(){
    if(isLoggedIn){openPanel();}else{document.getElementById('pdjPassword').value='';
    document.getElementById('pdjLoginMsg').style.display='none';
    document.getElementById('pdjLoginModal').classList.add('active');}});}
    document.getElementById('pdjPanelClose').addEventListener('click',cancelEdit);
    document.getElementById('pdjPanelCancel').addEventListener('click',cancelEdit);
    panelOvl.addEventListener('click',cancelEdit);
    document.getElementById('pdjMasterToggle').addEventListener('click',function(){
    this.classList.toggle('on');updateBlocStates();triggerLivePreview();});
    var st=document.querySelectorAll('.pdj-edit-bloc-head .pdj-toggle');
    for(var t=0;t<st.length;t++){st[t].addEventListener('click',function(){
    this.classList.toggle('on');var bloc=this.closest('.pdj-edit-bloc');
    if(this.classList.contains('on'))bloc.classList.add('active');else bloc.classList.remove('active');
    triggerLivePreview();});}
    document.getElementById('pdjPassword').addEventListener('keydown',function(e){if(e.key==='Enter')pdjLogin();});
    document.getElementById('pdjPanelSave').addEventListener('click',function(){
    var data=buildDataFromForm();savePdj(data);savedDataBeforeEdit=data;
    var st=document.getElementById('pdjPanelStatus');
    st.textContent='\u2713 Menu du jour mis \u00e0 jour !';st.className='pdj-panel-status success';
    setTimeout(function(){st.style.display='none';st.className='pdj-panel-status';closePdjModals();},1500);});
    document.getElementById('pdjPanelClear').addEventListener('click',function(){
    if(confirm('Effacer tout le menu du jour ?')){localStorage.removeItem(STORAGE_KEY);
    savePdj(null);savedDataBeforeEdit=null;closePdjModals();}});
    attachLivePreview();initFirebase(loadPdj);
    })();