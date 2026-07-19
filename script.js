const chatBox = document.getElementById("chatBox");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bg-music");

const messages = [
  "Hlo",
  "Oyyy",
  "Saniya?",
  "Saniya tumhare liye kuch hai niche open button press karo ❤️"
];

let msgIndex = 0;
// AB 5 SEC ME 1 MESSAGE
const msgInterval = setInterval(() => {
  if(msgIndex < messages.length) {
    const div = document.createElement("div");
    div.className = "msg";
    div.innerText = messages[msgIndex];
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    msgIndex++;
  } else {
    clearInterval(msgInterval);
    openBtn.style.display = "block";
  }
}, 5000); // 5 SECOND

openBtn.addEventListener("click", () => {
  goToPage(1);
  music.play().catch(()=>{});
  startFireworks();
});

function goToPage(n) {
  document.querySelectorAll('.page').forEach(p => p.style.display='none');
  document.getElementById('page'+n).style.display='flex';
  if(n==2) showMemory();
  if(n==4) finalExplosion();
}

// MEMORY
let current = 0;
const memories = document.querySelectorAll(".memory");
function showMemory() {
  memories.forEach((m, i) => m.style.display = i === current? "block" : "none");
  document.getElementById("prevBtn").disabled = current === 0;
  document.getElementById("nextBtn").disabled = current === memories.length - 1;
}
function nextMemory() { if(current < memories.length-1){current++; showMemory();} }
function prevMemory() { if(current > 0){current--; showMemory();} }

// FIREWORKS
function startFireworks(){
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  let particles = [];
  for(let i=0; i<150; i++){
    particles.push({x:canvas.width/2, y:canvas.height/2, vx:(Math.random()-0.5)*14, vy:(Math.random()-0.5)*14, r:Math.random()*4+2, color:`hsl(${Math.random()*360},100%,70%)`});
  }
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.x+=p.vx; p.y+=p.vy; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.color; ctx.fill(); });
    if(particles.length>0) requestAnimationFrame(animate);
  }
  animate();
}
function finalExplosion(){ startFireworks(); }