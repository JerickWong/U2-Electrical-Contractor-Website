function renderMTS(mts) {

    console.log(mts.data())


    db.collection('MTS-Collection').doc(mts.id).collection('products').get().then(snapshot => {
        snapshot.docs.forEach(product => {
            render(product)
        })
    })
}



function render(product) {
  console.log(product.data())  
}

db.collection('MTS-Collection').get().then(mtsSnapshot => {
    mtsSnapshot.docs.forEach(mts =>{
        renderMTS(mts)
    })

    
})

// db.collection('MTS-Collection').doc('1uiJ3esNsDYRMerFZThW').collection('products').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         render(doc)
//     })
// })