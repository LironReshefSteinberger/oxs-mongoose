const TenantService = require('../services/TenantService')
const mongoose = require('mongoose');

module.exports = (app) => {

    app.get('/tenant', (req, res) => {
        console.log('route before service-req');
        TenantService.query()
            .then(tenants => {
                console.log({tenants})
                res.json(tenants)
            })
    })
    // app.get('/tenant', (req, res) => {
    //     TenantService.queryTenants(req.query.name, req.query.type)
    //         .then(tenants => {
    //             console.log('back from TenantService', tenants);
    //             res.json(tenants)
    //         })
    //     // TenantService.queryTenants()
    //     // .then(tenants => res.json(tenants))
    // })
    
    app.get('/tenant/:tenantId', (req, res) => {
        const tenantId = req.params.tenantId;
        
        TenantService.getById(tenantId)
            .then(tenant => {
                // console.log('tenant??', tenant);
                res.json(tenant)
            })
    })

    app.delete('/tenant/:tenantId', (req, res) =>{
        const tenantId = req.params.tenantId;
        // console.log('tenant deleted****', tenantId);
        TenantService.remove(tenantId)
            .then((tenant)=>{
                // console.log('result', result)
                res.end(`Tenant ${tenantId} Deleted `)
            })
    })
    
    app.post('/tenant', (req, res) => {
        const tenant = req.body;
        TenantService.add(tenant)
            .then(tenant => {
                res.json(tenant)
            })
    })
    
    app.put('/tenant/:tenantId', (req, res)=>{
        const tenant = req.body;
        TenantService.update(tenant)
            .then(tenant => res.json(tenant))
    })
    
}