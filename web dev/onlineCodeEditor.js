const horizontalResizers = document.querySelectorAll('.resizer.horizontal');
const verticalResizer = document.querySelector('.resizer.vertical');
const leftPanel = document.querySelector('.left');
const rightPanel = document.querySelector('.right');

// Vertical Resizer
verticalResizer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', resizePanels);
    document.addEventListener('mouseup', stopResizingPanels);
});

function resizePanels(e) {
    const newLeftWidth = e.clientX / window.innerWidth * 100;
    leftPanel.style.width = `${newLeftWidth}%`;
    rightPanel.style.width = `${100 - newLeftWidth}%`;
}

function stopResizingPanels() {
    document.removeEventListener('mousemove', resizePanels);
    document.removeEventListener('mouseup', stopResizingPanels);
}

// Horizontal Resizers
horizontalResizers.forEach((resizer) => {
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const currentResizer = e.target;
        document.addEventListener('mousemove', resizeSections);
        document.addEventListener('mouseup', stopResizingSections);

        function resizeSections(e) {
            const parent = currentResizer.previousElementSibling;
            const sibling = currentResizer.nextElementSibling;
            const parentHeight = e.clientY - parent.getBoundingClientRect().top;
            const siblingHeight = sibling.getBoundingClientRect().bottom - e.clientY;
            parent.style.flexBasis = `${parentHeight}px`;
            sibling.style.flexBasis = `${siblingHeight}px`;
        }

        function stopResizingSections() {
            document.removeEventListener('mousemove', resizeSections);
            document.removeEventListener('mouseup', stopResizingSections);
        }
    });
});

// ================API call====================

// const api_url="PUsjiGXsPiXjn32aQaNHZg==vJ76JqhoTsPnKgSJ";
// async function getquote(url){
//     const response=await fetch(url);
//     var data=await response.json();
//     console.log(data);
// }
// var category = 'happiness'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
//     headers: { 'X-Api-Key': 'PUsjiGXsPiXjn32aQaNHZg==vJ76JqhoTsPnKgSJ'},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });

// ===============================API call ends===================================



// ============================== Hidden Nav Closing ========================

const hiddenNavBarCloseBtn = document.querySelector('.closingIcon');
hiddenNavBarCloseBtn.addEventListener('click', () => {
    const hiddenNavBar = document.querySelector('.onClickNavBar');
    hiddenNavBar.style.display='none';
});















// ============================== Hidden Nav Closing ========================




// Selectors for the code editors and output iframe
const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const output = document.getElementById('output');

// Function to update the output iframe
function updateOutput() {
    const html = htmlCode.value; // Get HTML code
    const css = `<style>${cssCode.value}</style>`; // Wrap CSS in <style> tags
    const js = `<script>${jsCode.value}<\/script>`; // Wrap JS in <script> tags

    // Combine HTML, CSS, and JS into one document
    const iframeContent = `${html}${css}${js}`;

    // Write the content to the iframe
    const iframeDoc = output.contentDocument || output.contentWindow.document;
    iframeDoc.open(); // Clear previous content
    iframeDoc.write(iframeContent); // Write new content
    iframeDoc.close(); // Close the document
}

// Add event listeners to update the output in real-time
htmlCode.addEventListener('input', updateOutput);
cssCode.addEventListener('input', updateOutput);
jsCode.addEventListener('input', updateOutput);

// Initialize with empty output (or placeholder if needed)
updateOutput();


const minWidth = 0; // Minimum panel width in percentage
const maxWidth = 100; // Maximum panel width in percentage
function resizePanels(e) {
    let newLeftWidth = (e.clientX / window.innerWidth) * 100;
    newLeftWidth = Math.max(minWidth, Math.min(maxWidth, newLeftWidth));
    leftPanel.style.width = `${newLeftWidth}%`;
    rightPanel.style.width = `${100 - newLeftWidth}%`;
}


function updateOutput() {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;
    let js = '';
    try {
        js = `<script>${jsCode.value}<\/script>`;
    } catch (error) {
        console.error("Error in JavaScript code:", error);
    }
    const iframeContent = `${html}${css}${js}`;
    const iframeDoc = output.contentDocument || output.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(iframeContent);
    iframeDoc.close();
}

// *******************************************************

// Selectors
const outputBox = document.querySelector('.outputBox');
const brightnessControls = document.getElementById('brightness');
const brightnessIcons = brightnessControls.querySelectorAll('img');

// Default settings
outputBox.style.backgroundColor = 'rgba(27, 26, 26, 0.958)'; // Default background for output box

// Event listener for brightness controls
brightnessIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        switch (index) {
            case 0: // Default mode
                outputBox.style.backgroundColor = 'rgba(27, 26, 26, 0.958)'; // Default background
                break;
            case 1: // Light mode
                outputBox.style.backgroundColor = '#f0f0f0'; // Light background
                break;
            case 2: // Dark mode
            outputBox.style.backgroundColor = '#000000'; // Dark background
            break;
            default:
                break;
        }
    });
});

// // full screen mode
// const maxi = document.getElementById('maxi');
// const mini = document.getElementById('mini');
// const navBar = document.getElementById('navBar');
// const editorBody = document.querySelector('.editorBody');

// maxi.addEventListener('click', () => {
//     if (!document.fullscreenElement) {
//         document.body.requestFullscreen();
//         navBar.style.display = 'none'; // Hide the navbar
//         editorBody.classList.add('fullscreen'); // Adjust the editorBody to fullscreen
//         maxi.style.display = 'none';
//         mini.style.display = 'inline'; // Show minimize icon
//     }
// });

// mini.addEventListener('click', () => {
//     if (document.fullscreenElement) {
//         document.exitFullscreen();
//         navBar.style.display = 'flex'; // Show the navbar
//         editorBody.classList.remove('fullscreen'); // Revert editorBody height
//         mini.style.display = 'none';
//         maxi.style.display = 'inline'; // Show maximize icon
//     }
// });

// // Enter Fullscreen
// maxi.addEventListener('click', () => {
//     if (!document.fullscreenElement) {
//         document.body.requestFullscreen();
//         navBar.style.display = 'none'; // Hide navbar
//         editorBody.style.height = '100%'; // Make editorBody take up the full height
//         maxi.style.display = 'none'; // Hide maximize icon
//         mini.style.display = 'inline'; // Show minimize icon
//     }
// });

// // Exit Fullscreen
// mini.addEventListener('click', () => {
//     if (document.fullscreenElement) {
//         document.exitFullscreen().then(() => {
//             navBar.style.display = 'flex'; // Show navbar
//             editorBody.style.height = 'calc(100% - 60px)'; // Restore editorBody height
//             mini.style.display = 'none'; // Hide minimize icon
//             maxi.style.display = 'inline'; // Show maximize icon
//         });
//     }
// });

// ************************************
const maxi = document.getElementById('maxi');
const mini = document.getElementById('mini');
const navBar = document.querySelector('.navBar'); // Use querySelector to get the first .navBar element
const editorBody = document.querySelector('.editorBody');

maxi.addEventListener('click', function () {
    if (!document.fullscreenElement) {
        document.body.requestFullscreen();
        navBar.style.display = 'none'; // Hide the navBar
        maxi.style.display = 'none';  // Hide maximize icon
        mini.style.display = 'inline'; // Show minimize icon
        editorBody.classList.add('fullscreen');
        document.querySelector('.right').classList.add('fullscreen');
    }
});

mini.addEventListener('click', function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Listen for fullscreen change event to restore the navbar
document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        navBar.style.display = 'flex'; // Restore the navbar after exiting fullscreen
        mini.style.display = 'none';  // Hide minimize icon
        maxi.style.display = 'inline'; // Show maximize icon
        editorBody.classList.remove('fullscreen');
        document.querySelector('.right').classList.remove('fullscreen');
    }
});


// function reload(){
//     const userPermissionToReload=confirm('Your may loose your code');
//     if(userPermissionToReload){
//         location.reload();
//     }else{
//         alert('You have cancelled the reload');
//     }
// }
// Ensure the DOM is loaded before attaching event listeners
// document.addEventListener('DOMContentLoaded', function () {
//     const resetScreen = document.getElementById('resetScreen');
//     const userPermissionToReload = confirm('Your may loose your code');
//     resetScreen.onclick = function () {
//         if(userPermissionToReload){
//             location.reload();
//         }else{
//             alert('Reload page discarded');
//         }
//     };
// });








// =================================demo code===========================================
// Function to download the content of a textarea as a file
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Adding event listeners to the download buttons
document.getElementById('HTML downloadBtn').addEventListener('click', () => {
    const htmlCode = document.getElementById('htmlCode').value;
    downloadFile(htmlCode, 'index.html');
});

document.getElementById('CSS downloadBtn').addEventListener('click', () => {
    const cssCode = document.getElementById('cssCode').value;
    downloadFile(cssCode, 'style.css');
});

document.getElementById('JS downloadBtn').addEventListener('click', () => {
    const jsCode = document.getElementById('jsCode').value;
    downloadFile(jsCode, 'script.js');
});

