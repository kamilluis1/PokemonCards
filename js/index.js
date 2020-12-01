class PokemonTCGCatalog {
  constructor() {
    this.API = "https://api.pokemontcg.io";
    this.API_VERSION = "v1";
    this.API_RESOURCE_CARDS = "cards";

    this.API_ENDPOINT_CARDS = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE_CARDS}`;

    this.UISelectors = {
      content: "[data-content]", // <section class="catalog-content" data-content></section>
      button: "[data-button]",
      loader: "[data-loader]",
      search: "search",
      card: "[data-card]",
      info: "[data-info]",
      
    };
    this.catalog = null; // document.querySelector(this.UISelectors.content)
    this.button = null;
    this.loader = null;
    this.search = null;
    this.info = null;
  

    this.cards = []; //const { cards } = this.fetchData(this.API_ENDPOINT_CARDS);
    this.newCards = [];
    this.pageSize = 24;
    this.currentPage = 1;
  }

  initializeCatalog() {
    this.catalog = document.querySelector(this.UISelectors.content);
    this.button = document.querySelector(this.UISelectors.button);
    this.loader = document.querySelector(this.UISelectors.loader);
    this.search = document.getElementById(this.UISelectors.search);
    this.info = document.querySelector(this.UISelectors.info);


    this.addEventListeners();
    // this.addMoreCards();
    // this.inputSearch();
    this.pullCards();

  }

  addEventListeners() {
    this.button.addEventListener("click", () => this.pullCards());
    this.search.addEventListener("keyup", () => this.filterCards());
  }

  // addMoreCards() {
  //     this.button.addEventListener('click', () => this.pullCards())
  // }

  // inputSearch() {
  //     this.search.addEventListener('keyup', () => this.filterCards())
  // }

  async pullCards() {
    // this.loader.classList.remove('hide');
    // this.button.classList.add('hide')
    this.toggleLoader(this.loader, this.button);

    const { cards } = await this.fetchData(
      `${this.API_ENDPOINT_CARDS}?page=${this.currentPage}&pageSize=${this.pageSize}`
    );

    this.toggleLoader(this.loader, this.button);
    // this.loader.classList.add('hide');
    // this.button.classList.remove('hide')

    // this.cards = [...cards]; // const { cards } = this.fetchData(`${this.API_ENDPOINT_CARDS}?page=${this.currentPage}&pageSize=${this.pageSize}`)
    this.cards = [...this.cards, ...cards];
    this.newCards = [...cards]; // const { cards } = this.fetchData(`${this.API_ENDPOINT_CARDS}?page=${this.currentPage}&pageSize=${this.pageSize}`)

    this.createCatalog(this.cards);
    this.currentPage++;
  }

  toggleLoader(...elements) {
    elements.forEach((element) => element.classList.toggle("hide"));
  }

  async fetchData(url) {
    const response = await fetch(url);
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  createCatalog(cards) {
    this.catalog.innerHTML = cards
      .map((card) => this.createCard(card))
      .join(" ");
  }

  createCard({ name, number, imageUrl, supertype, subtype, rarity, id }) {
    // return `
    //     <div class ="card" id=${id} data-card>
    //         <header class="card__header">
    //             <h2 class="card__heading">${name}</h2>
    //             <p class="card__number">Nr:${number}</p>
    //         </header>
    //         <img class="card__image" src="${imageUrl}" alt="${name}"/>
    //         <p class="card__description">Supertype: ${supertype}</p>
    //         <p class="card__description">Subtype: ${subtype}</p>
    //         <p class="card__description ${
    //           rarity ? "" : "hide"
    //         }">Rarity: ${rarity}</p>
    //     </div>
    //     `;

    return` <div class="card" id=${id} data-card>
    <div class="card__inner" data-inner>
        <div class="card__face card__face--front">
            <img src="${imageUrl}" class='card__image' alt="${name}">
        </div>
        <div class="card__face card__face--back">
            <div class="card__content">
                <img src="${imageUrl}" class='card__content-image'>
                <h2 class='card__heading'>${name}</h2>
                <p class="card__description">Supertype: ${supertype}</p>
                <p class="card__description">Subtype: ${subtype}</p>
                <p class="card__description ${
                  rarity ? "" : "hide"
                }">Rarity: ${rarity}</p> 
            </div>
        </div>
    </div>
</div>`
  }

  filterCards() {
    const searchValue = this.search.value.toLowerCase();

    searchValue === length
      ? this.button.classList.add("hide")
      : this.button.classList.remove("hide");

    document
      .querySelectorAll(this.UISelectors.card)
      .forEach((el) => el.classList.remove("hide"));

    const filteredCards = this.cards.filter(
      ({ name }) => !name.toLowerCase().includes(searchValue)
    );

    // filteredCards.length === this.cards.length ? this.info.classList.remove('hide') : t
    // his.info.classList.add('hide');

    filteredCards.forEach(({ id }) =>
      document.getElementById(id).classList.add("hide")
    );
  }

  // async initializeCatalog() {
  //     const response = await fetch(this.API_ENDPOINT);
  //     const responseJson = await response.json();
  //     const data = responseJson.cards[0].name;
  //     console.log(data)
  // }


 }
