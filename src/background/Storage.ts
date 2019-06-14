/**
 * 创建payload
 */
interface CreatePayload {

}

/**
 * 更新payload
 */
interface UpdatePayload {

}

/**
 * 删除payload
 */
interface DeletePayload {

}

/**
 * 获取payload
 */
interface GetPayload {

}

class DataBase {
    id: string | number;
    constructor(id: string | number){
        this.id = id;
    }
    create(payLoad: CreatePayload){}
    update(payLoad: UpdatePayload){}
    delete(payLoad: DeletePayload){}
    get(payLoad: GetPayload){}
}