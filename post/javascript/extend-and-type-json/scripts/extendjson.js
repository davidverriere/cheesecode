
function FeatureCollection(jsonObject) {
    if (!jsonObject) {
        throw 'jsonObject can\'t be null';
    }
    
    //copie de toutes les propriété json dans notre objet "typé"
    for (var prop in jsonObject) {
        //on utilise hasOwnProperty pour ne copier que les propriétés de l'objet json et non les propriétés de base des objets javascript tel toString
        if (jsonObject.hasOwnProperty(prop)) {
            this[prop] = jsonObject[prop];
        }
    }
}

FeatureCollection.prototype =
{
    //Permet de retrouver un défibrilateur en fonction d'un nom de lieu via un contient
    find: function (name) {
        if (!name)
            return this.features;
        return $.grep(this.features, function(feature, index) {
            return feature.properties.nom.toLowerCase().indexOf(name.toLowerCase()) >= 0;
        });
    }
};

$.getJSON('https://inspire.data.gouv.fr/api/geogw/services/55d1f9f32984a74b70f3cd07/feature-types/ms:mmm_defibrillateurs/download?format=GeoJSON&projection=WGS84', function (json) {

    var defibrilator = new FeatureCollection(json);
    var result = defibrilator.find('piscin'));

});