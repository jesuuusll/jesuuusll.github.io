// Función para abrir el menú
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

// Función para cerrar el menú
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

// Redirigir al formulario de publicación cuando haces clic en "Publicar" en el menú
document.querySelector('a[href="#publicar"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('recipeForm').scrollIntoView({ behavior: 'smooth' });
    closeNav(); // Cerrar el menú una vez que redirige a la sección
});

// Función para manejar la publicación de recetas
document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const title = document.getElementById('recipeTitle').value;
    const content = document.getElementById('recipeContent').value;

    if (title && content) {
        // Guardar la receta en localStorage
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push({ title, content });
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Limpiar los campos del formulario
        document.getElementById('recipeTitle').value = '';
        document.getElementById('recipeContent').value = '';

        // Mostrar las recetas actualizadas
        loadRecipes();

        // Desplazarse a la sección de recetas publicadas después de publicar
        document.getElementById('recetas').scrollIntoView({ behavior: 'smooth' });
    }
});

// Función para cargar las recetas desde localStorage
function loadRecipes() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = ''; // Limpiar la lista actual

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Mostrar las recetas almacenadas
    recipes.forEach(function(recipe) {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-item');
        recipeDiv.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.content}</p>`;
        recipeList.appendChild(recipeDiv);
    });
}

// Cargar recetas cuando se abra la página
window.onload = function() {
    loadRecipes();
};

// Obtener el modal y el botón para cerrarlo
const vipModal = document.getElementById('vipModal');
const closeBtn = document.querySelector('.close');

// Abrir el modal cuando se hace clic en el enlace "VIP"
document.querySelector('a[href="#vip"]').addEventListener('click', function(event) {
    event.preventDefault();
    vipModal.style.display = 'block';
    closeNav(); // Cerrar el menú después de abrir el modal
});

// Cerrar el modal cuando se hace clic en la "X"
closeBtn.onclick = function() {
    vipModal.style.display = 'none';
}

// Cerrar el modal si se hace clic fuera de la ventana modal
window.onclick = function(event) {
    if (event.target == vipModal) {
        vipModal.style.display = 'none';
    }
}

// Función para manejar la búsqueda de recetas
document.getElementById('searchBtn').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Filtrar las recetas que coincidan con la búsqueda
    const filteredRecipes = recipes.filter(function(recipe) {
        return recipe.title.toLowerCase().includes(searchQuery) || 
               recipe.content.toLowerCase().includes(searchQuery);
    });

    // Mostrar las recetas filtradas
    displayRecipes(filteredRecipes);
});

// Función para mostrar recetas en la página (recetas filtradas o todas)
function displayRecipes(recipesToDisplay) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = ''; // Limpiar la lista actual

    // Si no se encuentran recetas
    if (recipesToDisplay.length === 0) {
        recipeList.innerHTML = '<p>No se encontraron recetas.</p>';
    }

    // Mostrar las recetas filtradas
    recipesToDisplay.forEach(function(recipe) {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-item');
        recipeDiv.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.content}</p>`;
        recipeList.appendChild(recipeDiv);
    });
}

