// Function to refresh the list of existing chapters
function refreshChapters() {
    const existingChaptersDiv = document.getElementById('existingChapters');
    existingChaptersDiv.innerHTML = ''; // Clear existing content

    const chapters = JSON.parse(localStorage.getItem('chapters')) || [];
    
    chapters.forEach((chapter, index) => {
        const chapterDiv = document.createElement('div');
        chapterDiv.classList.add('chapter');
        
        const chapterName = document.createElement('span');
        chapterName.textContent = chapter.name;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteChapter(index);

        chapterDiv.appendChild(chapterName);
        chapterDiv.appendChild(deleteButton);
        
        existingChaptersDiv.appendChild(chapterDiv);
    });
}

// Function to delete a chapter
function deleteChapter(index) {
    const chapters = JSON.parse(localStorage.getItem('chapters')) || [];
    
    if (index >= 0 && index < chapters.length) {
        const [deletedChapter] = chapters.splice(index, 1);
        localStorage.setItem('chapters', JSON.stringify(chapters));
        
        // Simulate file deletion (local file deletion is not possible directly from client-side)
        alert(`Chapter "${deletedChapter.name}" deleted! (File not actually deleted)`);

        refreshChapters(); // Refresh the list
    } else {
        alert('Invalid chapter index.');
    }
}

// Function to save a new chapter
document.getElementById('saveChapter').addEventListener('click', () => {
    const name = document.getElementById('chapterName').value.trim();
    const content = document.getElementById('chapterContent').value.trim();

    if (!name || !content) {
        alert('Please fill in both fields.');
        return;
    }

    const chapters = JSON.parse(localStorage.getItem('chapters')) || [];
    const fileName = `chapter${chapters.length + 1}.txt`;

    // Save the chapter in localStorage
    chapters.push({ name, fileName });
    localStorage.setItem('chapters', JSON.stringify(chapters));

    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);

    alert('Chapter saved successfully!');
    refreshChapters(); // Refresh the list of chapters
    document.getElementById('chapterName').value = '';
    document.getElementById('chapterContent').value = '';
});
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to index.html
});
// Initial call to populate existing chapters
refreshChapters();
