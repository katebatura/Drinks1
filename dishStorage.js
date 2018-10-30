
const dishStorage = new LocalStorage(),
      dishAJAXStorage = new AJAXStorage();
function addDish() {
    let dishName = prompt('Введите название блюда'),
          diet = confirm('Это блюдо диетическое?'),
          recipe = prompt('Введите рецепт приготовления');
    diet ? diet = 'да' : diet = 'нет';   
    let value = `диетическое: ${diet}
рецепт приготовления: ${recipe}`;
    if ( dishStorage.checkValue(`блюдо ${dishName}`) || dishAJAXStorage.checkValue(`блюдо ${dishName}`) ) {
        if (confirm('Такой напиток уже есть в базе. Заменить его значение?')) {
            dishStorage.addValue(`блюдо ${dishName}`,value);
            dishAJAXStorage.addValue(`блюдо ${dishName}`,value);
        };
    } else {
        dishStorage.addValue(`блюдо ${dishName}`,value);
        dishAJAXStorage.addValue(`блюдо ${dishName}`,value);
    }
    
}
function getDishesInfo() {
    let dishName = prompt('Введите название блюда');
    console.log(`блюдо ${dishName}
${dishStorage.getValue(`блюдо ${dishName}`)}`);  

dishAJAXStorage.getValue(`блюдо ${dishName}`);
}
    
function deleteDish() {
    let dishName = prompt('Введите название блюда');
    if ( dishStorage.deleteValue(`блюдо ${dishName}`) || dishAJAXStorage.checkValue(`блюдо ${dishName}`) ) {
        console.log(`Информация о блюде ${dishName} удалена`);
        dishAJAXStorage.deleteValue(`блюдо ${dishName}`)
    } else {
        console.log(`нет информации о блюде ${dishName}`);
    };
}
function listDishes() {
    dishStorage.getKeys('блюдо');
    dishAJAXStorage.getKeys('блюдо');
}

