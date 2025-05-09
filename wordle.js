let ligne=0
let colonne=0
const nombre_colonnes=5
const nombre_lignes=6
let caracteres_ligne=""
let mot=""
let fini=false
const liste_mots=["autre","acide","affre","alpha","alibi","aride","album","allie","antre","ambre","arome","amant","balai","brise","boule","bille","boucs","bouse","barre","cache","calin","colle","cimes","choux","croix","carre","clefs","chiot","chaud","chene","dards","doigt","douce","drape","dinde","datte","enfin","etals","elime","etang","foret","froid","fille","frais","folle","fuite","facon","fauve","ferie","foule","finis","flute","goret","grand","gigot","glace","galet","goule","grise","gland","garde","gamma","geais","hetre","hibou","hurle","houle","halte","homme","honni","hymne","igloo","ilots","irise","isole","jougs","jante","jambe","jarre","juste","jaune","koala","lourd","lacet","lande","lards","lapin","lente","larde","mords","maree","malin","marin","mulet","mutin","marie","mante","moule","morte","moral","noeud","nuees","natte","nulle","nacre","noyau","narer","neves","oeufs","orage","ortie","ombre","orque","poule","puree","parti","place","prise","ponte","prose","palet","palme","queue","quart","quand","quota","quark","quarz","rosee","reine","ruine","renom","riant","raler","ramer","rapin","radin","radis","rayon","route","sable","sueur","salir","salin","soute","sapin","score","scier","saule","toute","tarte","trous","trace","tombe","taupe","tempe","telle","union","usine","utile","voile","ville","vouer","verin","valve","vague","virus","wagon","xenon","yacks","yoyos","zeros","zooms","zebre"]
const nombre_mots=liste_mots.length


function initialisation() {
    let nombre_aleatoire=Math.floor(Math.random()*nombre_mots)
    mot=liste_mots[nombre_aleatoire]
    let body=document.getElementById("body")
    for (let i=0;i<6;i++) {
        for (let j=0;j<5;j++) {
            body.innerHTML+=`<div class="case" id="I${i}J${j}" style="position:absolute;margin-left:${80*j+550}px;margin-top:${80*i+130}"></div>`
        }
    }
}

document.addEventListener("keydown",function(event){
    console.log(event)
    if (event.key.length==1&&(event.key.codePointAt()>64&&event.key.codePointAt()<91)||(event.key.codePointAt()>96&&event.key.codePointAt()<123)&&!fini) {
        let id="I"+ligne+"J"+colonne
        let Case=document.getElementById(id)
        Case.innerHTML=`<p style="font-size:40px;display:flex;justify-content:center;margin:auto;font-weight:bold">${event.key.toUpperCase()}</p>`
        caracteres_ligne+=event.key
        if (colonne<nombre_colonnes-1) {
            colonne++
        }
        else {
            test(ligne)
            colonne=0
            ligne++
            caracteres_ligne=""
        }
    }
    else if (event.key=="Backspace"&&colonne!=0&&!fini) {
        colonne-=1
        let id="I"+ligne+"J"+colonne
        let Case=document.getElementById(id)
        Case.innerHTML=`<p></p>`
        caracteres_ligne=caracteres_ligne.slice(0,-1)
    }
})

function test(L) {
    let deja_utilise=[false,false,false,false,false]
    let couleurs_mots=[0,0,0,0,0]
    for (let j=0;j<nombre_colonnes;j++){
        let lettre=caracteres_ligne[j]
        if (lettre==mot[j]){
            couleurs_mots[j]=1 // 1 c'est bien place, 2 mal place, 0 c'est faux
            deja_utilise[j]=true
        }
        }

    for (let j=0;j<nombre_colonnes;j++){
        let lettre=caracteres_ligne[j]
        for (let k=0;k<nombre_colonnes;k++) {
            if (lettre==mot[k]&&couleurs_mots[j]==0&&(!deja_utilise[k])){
                couleurs_mots[j]=2
                deja_utilise[k]=true
            }
        }
    }

    for (let j=0;j<nombre_colonnes;j++) {
        let id="I"+L+"J"+j
        let Case=document.getElementById(id)
        if (couleurs_mots[j]==1) {
            Case.style.background="green"
            }
        else if (couleurs_mots[j]==2) {
            Case.style.background="orange"
            }
        else {Case.style.background="darkgrey"}
    }

    let test_fini=true
    for (let j=0;j<nombre_colonnes;j++){
        if (caracteres_ligne[j]!=mot[j]) {
            test_fini=false
        }
    }
    fini=test_fini
    if (fini){
        reussite()
    }
    else if (ligne==nombre_lignes-1){
        fini=true
        echec()
    }
}

function reussite(){
    let body=document.getElementById("body")
    body.innerHTML+=`<p class="message_fin">Bravo, belle réussite !</p>`
}
function echec(){
    let body=document.getElementById("body")
    body.innerHTML+=`<p class="message_fin">Le mot était : ${mot}</p>`
}