"use strict";

// "Main" script, launch when the page is loaded
window.onload = () => {
	displayToDos();

	window.addEventListener('keydown', event => {
		if(event.key === "Enter") {
			const inputText = document.getElementById("input");
			const inputDifficulty = document.getElementById("difficulty");
			const toDoText = inputText.value;
			const toDoDifficulty = inputDifficulty.value;

			if(toDoText !== "") {
				addToDo(toDoText, toDoDifficulty);

				const toDoList = loadLocalToDos();
				toDoList.push({ text: toDoText, difficulty: toDoDifficulty, completed: false });
				localSaveToDos(toDoList);

				inputText.value = "";
				inputDifficulty.value = "";
			}
			
		}
	});
}

// Save all the actual toDos in the local storage
function localSaveToDos(toDoList) {
	localStorage.setItem('toDos', JSON.stringify(toDoList));
}

// Load all the toDos that are in the local storage
function loadLocalToDos() {
	const localSave = localStorage.getItem('toDos');
	return localSave ? JSON.parse(localSave) : [];
}

// Display all the toDos in the local storage by adding them to the page
function displayToDos() {
	const savedToDos = loadLocalToDos();
	savedToDos.forEach(toDo => {
		addToDo(toDo.text, toDo.difficulty, toDo.completed);
	});
}

// Create the html content that will be the toDos, its checkbox and its delete button
function addToDo(toDoText, toDoDifficulty, isCompleted = false) {
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

	// The part that is managing the border's color
	if(!isNaN(value) && value >= 0 && value <= 10) {
		if (value <= 3) taskContainer.style.border = "4px solid #0a9e10";
		else if (value > 3 && value <= 6) taskContainer.style.border = "4px solid #f3d440";
		else if (value > 6 && value <= 8) taskContainer.style.border = "4px solid #e68619";
		else taskContainer.style.border = "4px solid #bb0b0b";
		difficultyLabel.innerText = `${toDoDifficulty} / 10`;
	}
	else {
		difficultyLabel.innerText = "-- / 10";
	}

	// The part which create the delete button
	const deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.className = "deleteButton";

	// The part which is managing when the checkbox is checked or not
	element.addEventListener('change', () => {
		const toDoList = loadLocalToDos();
		const toDoIndex = toDoList.findIndex(toDo => toDo.text === toDoText && toDo.difficulty === toDoDifficulty);
		if (toDoIndex >= 0) {
			toDoList[toDoIndex].completed = element.checked;
			localSaveToDos(toDoList);
		}
		if(element.checked) {
			elementLabel.style.textDecoration = "line-through";
			elementLabel.style.color = "grey";
			difficultyLabel.style.color = "grey";
		}
		else {
			elementLabel.style.textDecoration = "none";
			elementLabel.style.color = "black";
			difficultyLabel.style.color = "black";
		}
	});

	// The part which is managing clicks on the delete button
	deleteButton.addEventListener('click', () => {
		taskContainer.remove();
		const toDoList = loadLocalToDos().filter(toDo => !(toDo.text === toDoText && toDo.difficulty === toDoDifficulty));
		localSaveToDos(toDoList);
	});

	const section = document.getElementById("toDos");

	taskContainer.appendChild(element);
	taskContainer.appendChild(elementLabel);
	taskContainer.appendChild(difficultyLabel);
	taskContainer.appendChild(deleteButton);
	section.appendChild(taskContainer);
}
