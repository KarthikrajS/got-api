import express from 'express';
import battledatas from '../models/BattleData';
import kings from '../models/Kings'
import types from '../models/Types'
import parseErrors from '../utils/parseErrors'

const router = express.Router();

router.post('/battleDetails',(req,res)=>{
    const {battleName} = req.body;
    battledatas.find({name:battleName}).then(battleData=>{
        res.json({results:{battle:battleData}})
    }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}))
})

router.post('/battleBasedOnKings',(req,res)=>{
    const {king} = req.body;
    battledatas.find({attacker_king:  king}).then(battledata=>{
        res.json({results:{battles:battledata}})
    }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
})

router.post('/battleBasedOnTypes',(req,res)=>{
    const {type} = req.body;
    battledatas.find({battle_type:  type}).then(battledata=>{
        res.json({results:{battles:battledata}})
    }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
})

router.post('/battleBasedOnLocation',(req,res)=>{
    const {location} = req.body;
    battledatas.find({location: location}).then(battledata=>{
        res.json({results:{battles:battledata}})
    }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
})
router.post('/kings',(req,res)=>{
    kings.find({}).then(kings => {
        if (kings) {
            var lists=[];
            kings.forEach(king=>{
                //console.log(dict)
                lists.push(king.Kings)
            })
            lists =[...new Set(lists)]
            const returnList = []
            lists.forEach( list =>{
                var dict = {
                    key: list,
                    value: list,
                    text: list
                }
                returnList.push(dict)
            })
            res.json({results:{kings: returnList}})
        } else
            res.status(400).json({results: {kings: {key:"No Kings Found",value:"No Kings Found",text:"No Kings Found"}}})
    })
})

router.post('/types',(req,res)=>{

    types.find({}).then(types => {
        if (types) {
            var lists=[];
            types.forEach(type=>{
                //console.log(dict)
                lists.push(type.types)
            })
            lists =[...new Set(lists)]
            const returnList = []
            lists.forEach( list =>{
                var dict = {
                    key: list,
                    value: list,
                    text: list
                }
                returnList.push(dict)
            })
            res.json({results:{types: returnList}})
        } else
            res.status(400).json({results: {kings: {key:"No Kings Found",value:"No Kings Found",text:"No Kings Found"}}})
    })
})

router.post('/list',(req,res)=>{
    /*returns list(array) of all the places where the battle has taken place.
        E.g. ['Riverrun', 'Tyrell',....]*/

    battledatas.find({}).then(battledata => {
        if (battledata) {
            var lists =[];
            //console.log(battledata)
            battledata.forEach(element=>{

                //console.log(dict)
                lists.push(element.location)
            })
            lists =[...new Set(lists)]
            const returnList = []
            lists.forEach( list =>{
                var dict = {
                    key: list,
                    value: list,
                    text: list
                }
                returnList.push(dict)
            })
            res.json({results:{locations: returnList}})
        } else
            res.status(400).json({results: {locations: {key:"No Locations Found",value:"No Locations Found",text:"No Locations Found"}}})
    })
});

router.post('/count',(req,res)=>{

    const {data} = req.body
    var type = data.type;
    var value = data.value;

    if(type === null){
        battledatas.find({}).then(battledata=> {

                res.json({results: {count: battledata.length}})

    })
    }
    if(type ==="location"){
        battledatas.find({location: value}).then(battledata=> {
            res.json({results: {count: battledata.length}})
    })
    }
    if(type ==="type") {
        battledatas.find({battle_type: value}).then(battledata => {
            res.json({results: {count: battledata.length}})
        })
    }

        if(type ==="king"){
            battledatas.find({attacker_king: value}).then(battledata=> {
                res.json({results: {count: battledata.length}})
            })
        }

   /* ret returns the total number of battles occurred.*/
});
router.post('/search',(req,res)=>{
    const {king, type, location} = req.body.data
    console.log(req.body)
    if(king !== null && type ===null && location===null){
        battledatas.find({attacker_king:  king}).then(battledata=>{
            res.json({results:{battles:battledata}})
        }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
    }
    
    if(king !==null && type !==null && location!==null){
        battledatas.find({attacker_king: king,location:location, battle_type:type}).then(battledata=>{
            console.log(battledata)
            res.json({results:{battles:battledata}})
        }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
    }
    /*  /search?king=Robb Stark
 - return list of battles where 'attacker_king' or 'defender_king' was
 'Robb Stark'
 Should also work for multiple queries
 /search?king=Robb Stark&location=Riverrun&type=siege
*/
});
export default router;
