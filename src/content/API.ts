export function getList(){
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['list'], (res: any) => {
            const list = res.list;
            resolve(list);
        });
    });
}