import b from './b';

/**
 * 新建Binding Item
 */
interface ShortCut {
    keyboard: string[],
    name: string,
    url: string
};



function test1(a: string){
    console.log(a);
    console.log(b);
}

test1('1');