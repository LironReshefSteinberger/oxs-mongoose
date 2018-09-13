const ObjectId = require('mongodb').ObjectId;
// const mongoose = require('mongoose');
var Tenant;
require('./MongoService').connect()
    .then(mongoose => {
        var TenantSchema = new mongoose.Schema({
            name: { type: String, required: true },
            phoneNumber: String,
            address: { type: String, required: true },
            debtAmount: { type: Number, required: true },
        }, { collection: 'tenant' });

        Tenant = mongoose.model('Tenant', TenantSchema);

    })

function query() {
    console.log('query in service mongoose');
    return Promise.resolve(Tenant.find())
}




function queryTenants(name, type) {
    console.log('name', name, 'type', type);
    var criteria = {};
    if (name) criteria.name = { $regex: `.*${name}.*` };
    if (type && type === 'has') criteria.debtAmount = { $gt: 0 };
    else if (type && type === 'no') criteria.debtAmount = { $eq: 0 };
    console.log('Criteria', criteria);
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('tenant');
            return collection.find(criteria).toArray()
        })
}

function remove(tenantId) {
    tenantId = new ObjectId(tenantId)
    return Promise.resolve(Tenant.findByIdAndRemove(tenantId).exec())
}

function update(tenant) {
    tenant._id = new ObjectId(tenant._id);
    Tenant.findById(tenant._id, (err, updatedTenant => {
        if(err) {
            console.log('no tenant was found');
        }
        updatedTenant = tenant;
        updatedTenant.save();
    }))

    updatedTenant.save();
    return Promise.resolve();
}

function add(tenant) {
    var updatedTenant = new Tenant(tenant)
    // return updatedTenant.save()
    updatedTenant.save()
    return Promise.resolve();
}

function getById(tenantId) {
    tenantId = new ObjectId(tenantId)
    Tenant.findById(tenantId);
    return Promise.resolve();
}

module.exports = {
    queryTenants,
    query,
    remove,
    getById,
    add,
    update
}



