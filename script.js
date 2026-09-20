const products = [
{id:1,name:"سلوبت جبردين شورت الأسد",subtitle:"سلوبت شورت + اندر شيرت",price:350,originalPrice:450,color:"كريمي",sizes:["2 سنوات","3 سنوات","4 سنوات"],images:["assets/product-1-1.jpg","assets/product-1-2.jpg"]},
{id:2,name:"سلوبت جبردين شورت BEA",subtitle:"سلوبت شورت + اندر شيرت",price:350,originalPrice:450,color:"كريمي",sizes:["2 سنوات","3 سنوات","4 سنوات"],images:["assets/product-2-1.jpg","assets/product-2-2.jpg"]},
{id:3,name:"سلوبت جبردين سنابل",subtitle:"سلوبت طويل + اندر شيرت",price:400,originalPrice:500,color:"كريمي",sizes:["2 سنوات","3 سنوات","4 سنوات"],images:["assets/product-3-1.jpg","assets/product-3-2.jpg"]},
{id:4,name:"سلوبت جبردين الحيوانات اللطيفة",subtitle:"سلوبت طويل + اندر شيرت",price:400,originalPrice:500,color:"كريمي",sizes:["2 سنوات","3 سنوات","4 سنوات"],images:["assets/product-4-1.jpg","assets/product-4-2.jpg"]}
];
let cart=JSON.parse(localStorage.getItem("khbaby-cart")||"[]"), selectedProduct=null, selectedSize=null;
const $=s=>document.querySelector(s);
function money(n){return n.toLocaleString("ar-EG")+" ج.م"}
function renderProducts(){
 $("#productGrid").innerHTML=products.map(p=>`<article class="product">
<img src="${p.images[0]}" alt="${p.name}">
<div class="pbody"><h3>${p.name}</h3><p>${p.subtitle} • ${p.color}</p><div class="pfoot"><span class="price"><del>${money(p.originalPrice)}</del> ${money(p.price)}</span><button class="view" onclick="openProduct(${p.id})">التفاصيل</button></div></div></article>`).join("");
}
function openProduct(id){
 selectedProduct=products.find(p=>p.id===id); selectedSize=null;
 $("#modalGallery").innerHTML=selectedProduct.images.map((img,i)=>`<img src="${img}" alt="${selectedProduct.name} - صورة ${i+1}">`).join("");
 $("#modalName").textContent=selectedProduct.name; $("#modalSub").textContent=selectedProduct.subtitle+" • اللون "+selectedProduct.color;
 $("#modalPrice").innerHTML=`<del>${money(selectedProduct.originalPrice)}</del> <strong>${money(selectedProduct.price)}</strong>`;
 $("#modalSizes").innerHTML=selectedProduct.sizes.map(s=>`<button class="size" onclick="chooseSize(this,'${s}')">${s}</button>`).join("");
 $("#productModal").classList.add("show"); $("#productModal").setAttribute("aria-hidden","false");
}
function chooseSize(btn,size){selectedSize=size;document.querySelectorAll(".size").forEach(x=>x.classList.remove("active"));btn.classList.add("active")}
$("#addFromModal").onclick=()=>{if(!selectedSize)return alert("من فضلك اختار المقاس");cart.push({productId:selectedProduct.id,size:selectedSize});saveCart();closeProduct();openCart()}
function saveCart(){localStorage.setItem("khbaby-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 $("#cartCount").textContent=cart.length;
 if(!cart.length){$("#cartItems").innerHTML='<div style="padding:40px 5px;text-align:center;color:#75818a">السلة فارغة حاليًا 🩵</div>';$(`#cartTotal`).textContent=money(0);return}
 let total=0;
 $("#cartItems").innerHTML=cart.map((item,i)=>{let p=products.find(x=>x.id===item.productId);total+=p.price;return `<div class="cart-item"><img src="${p.images[0]}" alt=""><div><h4>${p.name}</h4><small>المقاس: ${item.size}<br><del>${money(p.originalPrice)}</del> ${money(p.price)}</small></div><button class="remove" onclick="removeItem(${i})">حذف</button></div>`}).join("");
 $("#cartTotal").textContent=money(total)
}
function removeItem(i){cart.splice(i,1);saveCart()}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").style.display="block";renderCart()}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").style.display="none"}
function closeProduct(){$("#productModal").classList.remove("show");$("#productModal").setAttribute("aria-hidden","true")}
$("#openCart").onclick=openCart;$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;
document.querySelector("[data-close]").onclick=closeProduct;
$("#checkout").onclick=()=>{
 if(!cart.length)return alert("السلة فارغة");
 let lines=["مرحبًا KH Baby 👋","أريد تأكيد الطلب:",""];
 cart.forEach((item,i)=>{let p=products.find(x=>x.id===item.productId);lines.push(`${i+1}. ${p.name} — المقاس ${item.size} — ${money(p.price)}`)});
 let total=cart.reduce((s,item)=>s+products.find(p=>p.id===item.productId).price,0);
 lines.push("",`الإجمالي: ${money(total)}`,"","الاسم:","المحافظة:","العنوان:","رقم الهاتف:");
 location.href="https://wa.me/201275472977?text="+encodeURIComponent(lines.join("\n"));
};
renderProducts();renderCart();
