"use strict";
window.onload = () => {
	window.addEventListener('keydown', event => {
		if(event.key === "Enter") {
			const inputText = document.getElementById("input");
			const toDoText = inputText.value;
			const inputDifficulty = document.getElementById("difficulty");
			const toDoDifficulty = inputDifficulty.value;

			if(toDoText != "") {
				const taskContainer = document.createElement("div");
				taskContainer.className = "taskContainer";

				const element = document.createElement("input");
				element.type = "checkbox";
				element.className = "taskCheckbox";

				const elementLabel = document.createElement("label");
				elementLabel.innerText = toDoText;
				elementLabel.className = "taskLabel";

				const difficultyLabel = document.createElement("label")
				difficultyLabel.className = "difficultyLabel";
				const value = parseInt(toDoDifficulty);

				if(!isNaN(value) && value >= 0 && value < 10) {
					if (value <= 3) taskContainer.style.border = "4px solid #0a9e10";
                    else if (value > 3 && value <= 6) taskContainer.style.border = "4px solid #f3d440";
                   	else if (value > 6 && value <= 8) taskContainer.style.border = "4px solid #e68619";
                   	else taskContainer.style.border = "4px solid #bb0b0b";
				}

				if(isNaN(value) || value < 0 || value > 10) {
					difficultyLabel.innerText = "-- / 10";
				}
				else difficultyLabel.innerText = `${toDoDifficulty} / 10`;

				const deleteButton = document.createElement("input");
				deleteButton.type = "button";
				deleteButton.className = "deleteButton";



				taskContainer.appendChild(element);
				taskContainer.appendChild(elementLabel);
				taskContainer.appendChild(difficultyLabel);
				taskContainer.appendChild(deleteButton);
				document.body.appendChild(taskContainer);

				element.addEventListener('change', () => {
					if(element.checked) {
						elementLabel.style.textDecoration = "line-through";
						elementLabel.style.color = "grey";
						difficultyLabel.style.color = "grey";
                        document.body.appendChild(taskContainer);
					} 
					else {
						elementLabel.style.textDecoration = "none";
						elementLabel.style.color = "black";	
						difficultyLabel.style.textDecoration = "none";
						difficultyLabel.style.color = "black";	
					}
				});

				deleteButton.addEventListener('click', () => {
					taskContainer.remove();
				});

				inputText.value = "";
				inputDifficulty.value = "";
			}
			
		}
	});
};
