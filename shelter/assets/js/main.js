let pets = [
    {
      "name": "Jennifer",
      "img": "assets/images/pets-jennifer.jpg",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "assets/images/pets-sophia.jpg",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "assets/images/pets-woody.jpg",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "assets/images/pets-scarlet.jpg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "assets/images/pets-katrine.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "assets/images/pets-timmy.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "assets/images/pets-freddie.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "assets/images/pets-charly.jpg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];


class Carousel{
    
    constructor(selector, itemsObj){
        
        this.carousel = document.querySelector(selector);
        this.items = this.carousel.querySelector(".carousel__items");
        this.left = this.carousel.querySelector(".carousel__arrow--left");
        this.right = this.carousel.querySelector(".carousel__arrow--right");
        this.left.addEventListener("click", () => this.prev() );
        this.right.addEventListener("click", () => this.next() );
        this.itemsObj = itemsObj;
        this.count=this.getCount();
        this.currentItemsId = [];
        this.nextItemsId = [];
        this.sliding=false;
        this.side="";
        this.throttled = false

        this.items.addEventListener("transitionend", (e) => {
            if(e.target.classList.contains("carousel__items") && this.sliding){
 
                this.sliding=false;
                this.items.style.transform="";
                this.items.classList.remove("carousel__items--sliding");

                if(this.side=="left"){
                    let lastIndex = this.items.children.length-1;
                    for(let i = lastIndex; i>lastIndex-this.count*2 ;i--){
                        this.items.children[i].remove();
                    }
                }else{
                    for(let i = 0; i<this.count*2; i++){
                        this.items.children[0].remove();
                    }
                }

                this.addNextItems();
            }

        });        
        
        window.addEventListener('resize', () => {
            
            if (!this.throttled) {
                
                let count = this.getCount();
                if(count!=this.count){
                    this.count=count;
                    this.render();
                }
                this.throttled = true;
              setTimeout(() => {
                this.throttled = false;
              }, 3);
            }  
          });


        this.render();
    }
    getCount(){
        if(document.documentElement.clientWidth>991){
            return 3;
        }else if(document.documentElement.clientWidth>766){
            return 2;
        }            
        return 1;                
    }
    getCard(card, id=0){
        return `
        <div class="carousel__item">
        <div class="our-friends__card pet-card" data-id=${id}>
          <div class="pet-card__img"><img width="270" height="270" src="${card.img}" alt=""></div>
          <div class="pet-card__name">${card.name}</div>
          <button class="button button--light pet-card__more">Learn more</button>
        </div>
        </div>
        `
    }
    render(){
        Array.from(document.querySelector(".carousel__items").children).forEach( el => el.remove());

        this.currentItemsId=[];
        this.nextItemsId=[];
        this.addCurrentItems();
        this.addNextItems();
    }
    next(){        
        this.sliding=true;
        this.side="right";
        this.currentItemsId=this.nextItemsId;
        this.nextItemsId=[];
        
        this.items.classList.add("carousel__items--sliding");
        this.items.style.transform="translateX(-200%)";
    }
    prev(){      
        this.sliding=true;
        this.side="left";
        this.currentItemsId=this.nextItemsId;
        this.nextItemsId=[];

        this.items.style.transform="translateX(0%)";
        this.items.classList.add("carousel__items--sliding");
    }
    _getRandom(){
        return Math.floor(Math.random() * pets.length);
    }
    _generateCurrentItems(){
        while (this.currentItemsId.length !== this.count) {
            let index = this._getRandom();
            if (this.currentItemsId.indexOf(index) === -1) {
                this.currentItemsId.push(index);
            }
        }
    }
    _generateNextItems(){
        while (this.nextItemsId.length !== this.count) {
            let index = this._getRandom();
            if (this.currentItemsId.indexOf(index) === -1 && this.nextItemsId.indexOf(index) === -1) {
                this.nextItemsId.push(index);
            }
        }
    }
    addNextItems(){
        this._generateNextItems();

        for(let i=0; i<this.count; i++){
            let card = pets[this.nextItemsId[i]];
            this.items.insertAdjacentHTML("afterbegin", this.getCard(card, this.nextItemsId[i]));
            this.items.insertAdjacentHTML("beforeend", this.getCard(card, this.nextItemsId[i]));
        }
    }
    addCurrentItems(){
        this._generateCurrentItems();
        for(let i=0; i<this.count; i++){
            let card = pets[this.currentItemsId[i]];
            this.items.insertAdjacentHTML("beforeend", this.getCard(card, this.currentItemsId[i]));
        }
    }

}

class Pagination{
    constructor(selector, itemsObj){
        this.pets = itemsObj;
        this.root = document.querySelector(selector);
        this.list = this.root.querySelector(".pets__list");
        this.firstPageBtn = this.root.querySelector(".pagination__first");
        this.prevPageBtn = this.root.querySelector(".pagination__prev");
        this.currentPageBtn = this.root.querySelector(".pagination__current");
        this.nextPageBtn = this.root.querySelector(".pagination__next");
        this.lastPageBtn = this.root.querySelector(".pagination__last");
        this.currentPage=1;
        this.pageCount=Math.ceil(48/this.getCardsPerPage());
        this.pages=[];

        this.firstPageBtn.addEventListener("click", ()=>{ this.getFirstPage() });
        this.prevPageBtn.addEventListener("click", ()=>{ this.getPrevPage() });
        this.nextPageBtn.addEventListener("click", ()=>{ this.getNextPage() });
        this.lastPageBtn.addEventListener("click", ()=>{ this.getLastPage() });

        this.generatePages();
        this.renderPage(this.currentPage);
    }
    generatePages(){
        
        this.pages=[];
        let randomCardsId=this.getRandomCardsId();
        for(let i=0; i<this.pageCount; i++){
            this.pages[i]=[];
            while(this.pages[i].length<this.getCardsPerPage()){
                let tmp = [];
                if(randomCardsId.length==0){
                    randomCardsId=this.getRandomCardsId();
                }
                if(this.pages[i].length!==0){
                    tmp = randomCardsId.filter( el => { return this.pages[i].includes(el) } )
                    randomCardsId = randomCardsId.filter( el => { return !this.pages[i].includes(el) } )
                }
                this.pages[i].push( ...randomCardsId.splice(0, this.getCardsPerPage() - this.pages[i].length ) );
                if(tmp.length!==0){
                    randomCardsId.unshift(...tmp);
                }
                
            }            
        }

    }
    renderPage(pageNumber){

        this._promiseAnimation(this.list, "pets__list--hiding").then( ()=> {
            Array.from(this.list.children).forEach( el => el.remove());
            for(let i =0; i<this.pages[pageNumber-1].length; i++){
                let index = this.pages[pageNumber-1][i];
                this.list.insertAdjacentHTML("beforeend", this.getCard(this.pets[index], index));            
            }
            this.list.classList.remove("pets__list--hiding");
        })

        
    }
    getRandomCardsId(){        
        let randomCardsId=[];
        while (randomCardsId.length !== this.pets.length) {
            let index = Math.floor(Math.random() * this.pets.length);
            if (randomCardsId.indexOf(index) === -1) {
                randomCardsId.push(index);
            }
        }
        return randomCardsId;
    }

    getCard(card, id=0){
        return `
        <div class="pets__item">
        <div class="our-friends__card pet-card" data-id=${id}>
          <div class="pet-card__img"><img width="270" height="270" src="../../${card.img}" alt=""></div>
          <div class="pet-card__name">${card.name}</div>
          <button class="button button--light pet-card__more">Learn more</button>
        </div>
        </div>
        `
    }
    getCardsPerPage(){
        if(document.documentElement.clientWidth>991){
            return 8;
        }else if(document.documentElement.clientWidth>766){
            return 6;
        }            
        return 3;  
    }
    _btnDisable(btn){
        btn.disabled=true;
        btn.classList.add("pets__page--inactive");
    }
    _btnEnable(btn){
        btn.disabled=false;
        btn.classList.remove("pets__page--inactive");
    }
    setCurrentPage(pageNumber){
        if(pageNumber<1 || pageNumber>this.pageCount){
            return false;
        }
        if(pageNumber===1){
            this._btnDisable(this.firstPageBtn);
            this._btnDisable(this.prevPageBtn);
        }
        if(pageNumber===this.pageCount){
            this._btnDisable(this.lastPageBtn);
            this._btnDisable(this.nextPageBtn);
        }
        if(this.currentPage===1 && pageNumber>this.currentPage){
            this._btnEnable(this.firstPageBtn);
            this._btnEnable(this.prevPageBtn);
        }
        if(this.currentPage===this.pageCount && pageNumber<this.currentPage){
            this._btnEnable(this.lastPageBtn);
            this._btnEnable(this.nextPageBtn);
        }

        this.currentPage=pageNumber;
        this.currentPageBtn.innerText=this.currentPage; 
        return this.currentPage;
    }

    getFirstPage(){
        
        this.renderPage( this.setCurrentPage(1) );
    }
    getPrevPage(){
        this.renderPage( this.setCurrentPage(this.currentPage-1) );
    }
    getNextPage(){
        this.renderPage( this.setCurrentPage(this.currentPage+1) );
    }
    getLastPage(){
        this.renderPage( this.setCurrentPage(this.pageCount) );
    }

    _promiseAnimation(elem, className){
        return new Promise(resolve => {
            elem.classList.add(className);
            elem.addEventListener("transitionend", resolve);
        });
    } 

}



function initModal(path=""){
    let modalTemplate = `
    <div class="modal">
    <div class="modal__overlay">
      <div class="modal__window">
        <div class="modal__close">
          <div class="modal__close-icon"></div>
        </div>
        <div class="modal__info">
          <div class="modal__img">
            <img src="" alt="">
          </div>
          <div class="modal__text">
            <h3 class="modal__title"></h3>
            <p class="modal__type"></p>
            <p class="modal__desc"></p>
            <ul class="modal__features">
              <li class="modal__futures-item"><b>Age:</b> <span class="modal__age"></span></li>
              <li class="modal__futures-item"><b>Inoculations:</b> <span class="modal__inoculations"></span></li>
              <li class="modal__futures-item"><b>Diseases:</b> <span class="modal__diseases"></span></li>
              <li class="modal__futures-item"><b>Parasites:</b> <span class="modal__parasites"></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalTemplate);
    let modal = document.querySelector(".modal");
    

    function openModal(petId){
        let pet = pets[petId];
        modal.querySelector(".modal__img img").src=path+pet.img;
        modal.querySelector(".modal__title").innerText=pet.name;
        modal.querySelector(".modal__type").innerText=pet.type+" - "+pet.breed;
        modal.querySelector(".modal__desc").innerText=pet.description;
        modal.querySelector(".modal__age").innerText=pet.age;
        modal.querySelector(".modal__inoculations").innerText=pet.inoculations.join(", ");
        modal.querySelector(".modal__diseases").innerText=pet.diseases.join(", ");
        modal.querySelector(".modal__parasites").innerText=pet.parasites.join(", ");

        modal.classList.add("modal--open");
        document.body.classList.add("body--noscroll");
    }
    function closeModal(){
        modal.classList.remove("modal--open");
        document.body.classList.remove("body--noscroll");        
    }
    document.body.addEventListener("click", e => {
        let petCard = e.target.closest(".pet-card");
        if(petCard){
            let petId = petCard.dataset.id;
            openModal(petId);
        }
    });
    modal.addEventListener("click", e => {
        if(e.target.classList.contains("modal__overlay") || e.target.closest(".modal__close")){
            closeModal();
        }
    });
}


function changeMobileMenu(){

    const burger = document.querySelector(".burger");
    const menu =  document.querySelector(".header .menu");
    const overflow = document.querySelector(".header__overflow");

    burger.classList.toggle("burger--open");
    menu.classList.toggle("menu--open");
    overflow.classList.toggle("header__overflow--open");
    document.body.classList.toggle("body--noscroll");

}

function initMobileMenu(){

    const burger = document.querySelector(".burger");
    const overflow = document.querySelector(".header__overflow");

    const menuItems = document.querySelector(".menu__items");

    [burger, overflow].forEach( 
        el => el.addEventListener("click", () => {
            changeMobileMenu();
        }) 
    );

    menuItems.addEventListener("click", e => {
        if(e.target.classList.contains("menu__link"))
            changeMobileMenu();
    }) 

}

function init(){
    initMobileMenu();

    if( document.querySelector(".carousel") ){
        let carousel = new Carousel(".carousel", pets);
    }
    if( document.querySelector(".pets") ){
        let pagination = new Pagination(".pets", pets);
    }
    path="";
    if( document.body.classList.contains("body--pets") ){
        path="../../";
    }
    initModal(path);
    
}

init();