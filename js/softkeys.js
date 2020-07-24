const softkeyCallback = {
    left: function() { window.open("about.html");  },
    exit: function() { window.close(); }
};
function handleKeyDown(evt) {
    console.log(evt.key);
    switch (evt.key) {
        case 'SoftLeft':
            softkeyCallback.left();
        break;

        case 'Endcall':
        case 'Backspace':
            softkeyCallback.exit();
        break;
    }
};

document.addEventListener('keydown', handleKeyDown);