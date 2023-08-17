let AddButton = document.querySelector("button.AddButton");
let EventContent = document.querySelector(".event");
let Day = document.querySelector(".day");
let Month = document.querySelector(".month");
let ShowingContent = document.querySelector("div.content");
let offset = localStorage.getItem("offset") || 0;
let clearButton = document.querySelector(".clearing");

AddButton.addEventListener("click", () => {
    let dateCheck = Day.value + Month.value; 
    if(dateCheck && EventContent.value){    // 檢查內容與日期不可留白
        let eventStorage = `${EventContent.value}     ${Month.value}/${Day.value}`;
        localStorage.setItem("temp", eventStorage);
    
        /* Make A newDiv */
        const newDiv = document.createElement("div");
        newDiv.textContent = localStorage.getItem("temp"); 
        newDiv.style.animation = "slide 0.65s ease-in-out"; // animatation
        ShowingContent.appendChild(newDiv); // 在Clickevent發生時 同時顯示在 newDiv
        
        let keyName = `key_${offset}`;
        offset++;
        localStorage.setItem("offset", offset);
        localStorage.setItem(keyName, newDiv.textContent);

        /* Create Delete Button */
        const deleteButton = document.createElement("button"); // 製造一個 <button> element
        deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-sm" style="color: #d6d6d6;"></i>';
        newDiv.appendChild(deleteButton); // <button> 的 父 是 <newDiv>
        const deleteButtonClass = `del_${keyName}`;
        deleteButton.classList.add(deleteButtonClass); // 把這個 <button> 賦予class 跟 newDiv 掛鉤
        localStorage.setItem(deleteButtonClass, keyName);

        /* Delete Button Event*/

        deleteButton.addEventListener("click", e => {
            const del = e.currentTarget.classList;
            const del2 = localStorage.getItem(del);
           
            e.currentTarget.parentElement.addEventListener("animationend", () =>{
                localStorage.removeItem(del);
                localStorage.removeItem(del2); 
                location.reload(); // F5
            })
            e.currentTarget.parentElement.style.animation = "fadeout 0.3s forwards";
            
        });
    
        /* 清空输入框的内容 */
        // EventContent.value = "";
        // Day.value = "";
        // Month.value = "";
    }
});

// 把存在 localStorage 的紀錄 print 出來    

for(let i=0; i<offset; i++){

    let KeyAccess = `key_${i}`;
    const printContent = localStorage.getItem(KeyAccess); // 拿到 contentDiv 的 key

    if(printContent){ // 這行很重要，假如你的 key_3 是空的 他才會跳過
        
        /* Create contentDiv */
        const contentDiv = document.createElement("div");
        contentDiv.textContent = printContent;
        ShowingContent.appendChild(contentDiv); // 把這個 element append 給 ShowingContent
        
        
        /* Create Delete Button */
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-sm" style="color: #d6d6d6;"></i>';
        contentDiv.appendChild(deleteButton);
        deleteButton.classList.add(`del_${KeyAccess}`);

        /* Delete Button Event */
        deleteButton.addEventListener("click", e => {
            const del = e.currentTarget.classList;
            const del2 = localStorage.getItem(del);

            e.currentTarget.parentElement.addEventListener("animationend", () =>{
                localStorage.removeItem(del);
                localStorage.removeItem(del2); 
                location.reload(); // F5
            })
            e.currentTarget.parentElement.style.animation = "fadeout 0.3s forwards";
            
        });
    }
};

clearButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload(); // F5
})