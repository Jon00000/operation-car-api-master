const car = require('./car'),
    readline = require('readline');

/**
 * stdin stdout
 * @type {Interface}
 */
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

/**
 * initial View
 */
function initView() {
    console.log('------shopping cart list------');
    console.log('1.Add item to shopping cart');
    console.log('2.My shopping cart');
    //监听用户选择
    rl.question('choose：',function(action) {
        switch (action) {
            case '1':
                //add
                addProduct();
                break;
            case '2':
                //get
                getProduct();
                break;
            default:
                console.log('wrong input!');
                //reset view
                resetView();
                break;
        }
    });
}

/**
 * resetView
 */
function resetView() {
    console.log('\033[2J');
    initView();
}

/**
 * Add items to the cart
 */
function addProduct() {
    //Store item data
    let product = {};
    //Monitor input of item data
    rl.question('Input name: ',function(name) {
        product.name = name;
        rl.question('Input price: ',function(price) {
            product.price = parseFloat(price);
            rl.question('Input quantity: ',function(count) {
                product.count = parseInt(count);
                //add to cart
                car.addProduct(product);
                
                resetView();
            });
        });
    });
}

/**
 * view my cart
 */
function getProduct() {
    if (car.getProduct()) {
        //Monitor operation
        opProduct();
    } else {
        //no data reset
        resetView();
    }
}

/**
 * Remove item from shopping cart
 */
function opProduct() {
    console.log('------Shopping Cart Operation------');
    console.log('1.Remove');
    console.log('2.Quit');
    //监听选择
    rl.question('Choose: ',function(action) {
        switch (action) {
            case '1':
                //remove
                delProduct();
                break;
            case '2':
                //quit
                resetView();
                break;
            default:
                console.log('wrong input!');
                //resetView
                resetView();
                break;
        }
    });
}

/**
 * Remove items from the cart
 */
function delProduct() {
    //remove Monitor
    rl.question('Please select the item to remove:',function(index) {
        let re = /^[0-9]+.?[0-9]*/;//validate input
        if (!re.test(index)) {
            console.log('wrong input!');
            
            resetView();
        } else {
            if (car.delProduct(parseInt(index))) {
               
                resetView();
            } else {
                console.log('Selected item does not exist!');
                
                resetView();
            }
        }
    });
}

//initView
initView();