//!Js + JqueryAjax + Django

console.log('Hello World')

//*Ajax Get car data

const carForm = document.getElementById('car-form')

const carsDataBox = document.getElementById('cars-data-box')
const carInput = document.getElementById('cars')

const modelsDataBox = document.getElementById('models-data-box')
const modelInput = document.getElementById('models')

const carText = document.getElementById('carText')
const modelText = document.getElementById('modelText')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

const btnBox = document.getElementById('btn-box')
const alertBox = document.getElementById('alert-box')


$.ajax({
    type: 'GET',
    url : '/cars-json/',
    success: function(response){
        // console.log(response.data);
        // console.log(typeof response.data) => object
        const carsData = response.data
        carsData.map(item=>{
            const option = document.createElement('div')
            option.textContent = item.name
            option.setAttribute('class','item')
            option.setAttribute('data-value',item.name)
            carsDataBox.appendChild(option)
        })

    },
    error : function(err){
        console.log(err)
    }
})

carInput.addEventListener('change',function(e){

    const selectedCar = e.target.value
    
    modelsDataBox.innerHTML = ''
    modelText.textContent = 'Choose a Model'
    modelText.classList.add('default')

    $.ajax({
        method: 'GET',
        url : `/models-json/${selectedCar}/`,
        success : function(response){
            console.log(response.dataModel)
            const modelsData = response.dataModel
            modelsData.forEach(function(item){
                const option = document.createElement('div');
                option.textContent = item.name
                option.setAttribute('class','item')
                option.setAttribute('data-value',item.name)
                modelsDataBox.appendChild(option)
            })
            
            //if change after GET reqeust dropdown
            modelInput.addEventListener('change',function(e){
                btnBox.classList.remove('not-visible')
            })

        },
        error : function(err){
            console.log(err)
        }
    })
})

carForm.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Submit Form')
    $.ajax({
        type: 'POST',
        url:'/create/',
        data:{
            'csrfmiddlewaretoken':csrf[0].value,
            'car':carText.textContent,
            'model':modelText.textContent
        },
        success : function(response){
            console.log(response);
            alertBox.innerHTML = `
                <div class="ui positive message">
                    <div>
                        Success
                    </div>
                    <p>Your order has been placed</p>
                </div>
            `
        },
        error : function(err){
            console.log(err);
            alertBox.innerHTML = `
                <div class="ui negative message">
                    <div class="header">
                        Ops
                    </div>
                    <p>Something went wrong</p>
                </div>
            `
        }
    })
})




