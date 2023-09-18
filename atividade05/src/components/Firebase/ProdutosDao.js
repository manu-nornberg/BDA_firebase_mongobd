import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import {
    ref,
    query,
    orderByChild,
    onChildAdded,
    off,
    endAt,
    endBefore,
    equalTo,
    startAt,
    startAfter,
    onValue,
    limitToFirst,
    limitToLast,
    DataSnapshot
} from "firebase/database"

function getOrderByChild(order, db, callback) {
    //Exemplo
    console.log(order);
    const refDB = ref(db, 'produtos/');
    const consulta = query(refDB, orderByChild(order))
    onChildAdded(consulta, callback)
}

function getFilterByChild(filter, value, db, callback) {
    console.log(filter)
    console.log(value)
    const refDB = ref(db, 'produtos/');
    const consulta = query(refDB, orderByChild(filter), startAfter(value))
    onChildAdded(consulta, callback)

}

function getMostExpensive(db, setValue) {
    const refDB = ref(db, "produtos/");
    const list = [];
    const consulta = query(refDB, orderByChild('preco'))
    onValue(consulta, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const produtos = childSnapshot.val();
            list.push(produtos);
        });
    })

    list.reverse();

    setValue(list);


}

function getMostCheap(db, callback) {
    const refDB = ref(db, "produtos/");
    const consulta = query(refDB, orderByChild('preco'))
    onChildAdded(consulta, callback)
}



function getPriceRange(value, db, callback) {//0--->limit
    const refDB = ref(db, 'produtos/');

    const consulta = query(refDB, orderByChild('preco'), endAt(+value));

    console.log(value)

    onChildAdded(consulta, callback)
}

export { getOrderByChild, getFilterByChild, getMostExpensive, getMostCheap, getPriceRange }
