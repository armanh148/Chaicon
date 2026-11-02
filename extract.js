const fs=require('fs');
const lines=fs.readFileSync('page.html','utf8').split(/\r?\n/);
const block=lines.slice(4213,6519).join('\n');
const cards=block.split('<div class="card p-0 product-card position-relative"').slice(1);
const dec=s=>s.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#039;/g,"'").replace(/&ndash;/g,'–');
const out=cards.map(c=>{
  const grab=(re,i=1)=>{const m=c.match(re);return m?dec(m[i].replace(/\s+/g,' ').trim()):'';};
  return {
    url:grab(/data-target="([^"]+)"/),
    id:grab(/data-id="([^"]+)"/),
    image:grab(/src="([^"]+\.webp)"/),
    alt:grab(/alt="([^"]*)"/),
    city:grab(/product-card-location" title="City">\s*<i[^>]*><\/i>\s*([^<]+)/),
    title:grab(/product-card-title[^>]*>\s*title="([^"]+)"/),
    short:grab(/product-card-title[^>]*>\s*title="[^"]*">\s*([^<]+)/),
    pkr:grab(/price-pkr">\s*([^<]+)/),
    usd:grab(/price-usd">\s*([^<]+)/),
    moq:grab(/MOQ:\s*([^<(]+)/),
    unit:grab(/MOQ:[^<]*\(([^)]+)\)/),
    seller:grab(/href="https:\/\/chaicon\.com\/[^"\/]+"\s*style="z-index: 2;">\s*([^<]+)/),
    sellerUrl:grab(/href="(https:\/\/chaicon\.com\/[^"\/]+)"\s*style="z-index: 2;">/),
  };
});
fs.writeFileSync('products.json',JSON.stringify(out,null,2));
out.forEach((p,i)=>console.log(i,p.city,'|',p.title.slice(0,60),'|',p.pkr,'|',p.moq,p.unit,'|',p.seller));
