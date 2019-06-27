export function getList(){
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['bindings'], (res: any) => {
            resolve(res.bindings || []);
        });
    });
}

export function creatBinding(binding: Binding){
    console.log(binding);
    return new Promise((resolve, reject) => {
        getList().then((bindings: Binding[]) => {
            chrome.storage.sync.set({
                bindings: [...bindings, binding]
            }, () => {
                resolve();
            })
        })
    })
}

export function deleteBinding(binding: Binding){
    return new Promise((resolve, reject) => {
        getList().then((bindings: Binding[]) => {
            chrome.storage.sync.set({
                bindings: bindings.filter(bind => bind.name !== binding.name)
            }, () => {
                resolve();
            })
        })
    })
}

export function modifyBinding(binding: Binding, target: Binding){
    return new Promise((resolve, reject) => {
        getList().then((bindings: Binding[]) => {
            chrome.storage.sync.set({
                bindings: bindings.map(bind => {
                    if(bind.shortcut === binding.shortcut){
                        bind = target;
                    }
                    return bind;
                })
            }, () => {
                resolve();
            })
        })
    })
}