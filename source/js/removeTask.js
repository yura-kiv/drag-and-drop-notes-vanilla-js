let remove = document.querySelectorAll(".delete-area");
remove.forEach(function(item){
    item.addEventListener('click', function(){
        this.parentElement.remove();
    })
})
