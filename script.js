const additems = document.querySelector('.add-items');
const itmesList = document.querySelector('.plates');


const items = JSON.parse(localStorage.getItem('items')) || [];

function additem (e){
e.preventDefault();
const text = (this.querySelector('[name=item]')).value;
const item = {
  text,
  done:false
};
items.push(item);
populatelist(items,itmesList);
localStorage.setItem('items',JSON.stringify(items));
this.reset();

};
function populatelist(plates =[],plateslist){
  plateslist.innerHTML = plates.map((plate, i)=>{
    return `
    <li>
    <input type ="checkbox" data-index=${i} id = "item${i}" ${plate.done ? 'checked':''}/>
    <label for ="item${i}">${plate.text}</label>
    </li>
    
    `;
  }).join('');
};

function toggleDone (e){
  if(!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index
  items[index].done = !items[index].done;
  localStorage.setItem('items',JSON.stringify(items));
  populatelist(items, itmesList);

};


additems.addEventListener('submit',additem);
itmesList.addEventListener('click', toggleDone);
populatelist(items, itmesList);