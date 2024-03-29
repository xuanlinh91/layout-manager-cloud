// Nguyen Xuan Linh 2024

const isObjectEmpty = (objectName) => {
	return Object.keys(objectName).length === 0
}

async function loadLayoutKeys() {
	let list = await chrome.storage.local.get("windowstatesaver_state_keys");
	let listStateKeys = list["windowstatesaver_state_keys"];
	if (listStateKeys == null){
		listStateKeys = "[]";
    }

    return JSON.parse(listStateKeys);
}

async function clearKeys(txt) {
	let list = await loadLayoutKeys();
    if (list === undefined) {
        list = [];
    }
    let i = list.indexOf(txt);
    if(i !== -1) {
        list.splice(i, 1);
    }
    await chrome.storage.local.set("windowstatesaver_state_keys", JSON.stringify(list));
}

async function loadWindows(originalWindowId, key) {
	let windows = JSON.parse(await chrome.storage.local.get('windowstatesaver_state'+key));
	if(windows === null)
		return;
	
	for(let index = 0; index < windows.length; index++)
	{
		let windowParams = {
			left: windows[index].left,
			top: windows[index].top,
			width: windows[index].width,
			height: windows[index].height,
			focused: windows[index].focused,
			incognito: windows[index].incognito,
			type: windows[index].type };
			
		chrome.windows.create(windowParams, function (index) {
			return function (window) {
				for(let tabIndex = 0; tabIndex < windows[index].tabs.length; tabIndex++)
				{
					let tabParams = {
						windowId: window.id,
						index: windows[index].tabs[tabIndex].index,
						url: windows[index].tabs[tabIndex].url,
						active: windows[index].tabs[tabIndex].active,
						pinned: windows[index].tabs[tabIndex].pinned };
						
					chrome.tabs.create(tabParams);
				}
				chrome.tabs.remove(window.tabs[0].id);
				if(originalWindowId !== null)
				{
					chrome.windows.remove(originalWindowId);
					originalWindowId = null;
				}
			};
		} (index));
	}
}


chrome.runtime.onMessage.addListener(
	async function(request, sender, sendResponse) {
		if(request.saveState) {
            let layout_keys = await loadLayoutKeys();
            let layout_key = request.layout_name;
            if (layout_keys === undefined) {
                layout_keys = [];
            }
            else {
                layout_keys.push(layout_key);
            }

            await chrome.storage.local.set({'windowstatesaver_state_keys': JSON.stringify(layout_keys)});

			chrome.windows.getAll({populate: true}, async function (windows) {
				let key = 'windowstatesaver_state'+ layout_key
				await chrome.storage.local.set({key: JSON.stringify(windows)});
				sendResponse("OK");
				console.log("Saving state.");
			});
		}
		else if (request.listState) {
            let keys = JSON.stringify(await loadLayoutKeys());
			console.log("keys to response")
			console.log(keys)
            sendResponse(keys);
        }
        else if (request.clearState) {
		    await clearKeys(request.layout_name);
            sendResponse("Done");
        }
		else if(request.loadState) {
			chrome.windows.getCurrent(async function (window) {
				await loadWindows(window.id, request.layout_name);
			});
			sendResponse({});
		}
	}
);
