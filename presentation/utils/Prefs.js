


import DefaultPreference from 'react-native-default-preference';

PREFS_ENUM = {
    PREPARATION_TIME : "Подготовка",
    WORK_TIME : "Работа",
    REST_TIME : "Отдых",
    CYCLE_COUNT : "Циклы",
    SET_COUNT : "Количество сетов",
    REST_BETWEEN_SETS_COUNT : "Отдых между сетами",
}

export default class Prefs {


    save(type:PREFS_ENUM,value:Int) {
        DefaultPreference.set(type, value.toString() ).then(function() {console.log('done')});
    }

    get(type:PREFS_ENUM){

        return DefaultPreference.get(type)
            .then(value => {
               if(value==null){

                   return this.getDefault(type)
               }
               else return parseInt(value);
            });


    }
    getDefault(type:PREFS_ENUM){

        switch (type){

            case PREFS_ENUM.PREPARATION_TIME:
                return 10
            case PREFS_ENUM.WORK_TIME:
                return 10
            case PREFS_ENUM.REST_TIME:
                return 5
            case PREFS_ENUM.CYCLE_COUNT:
                return 1
            case PREFS_ENUM.SET_COUNT:
                return 1
            case PREFS_ENUM.REST_BETWEEN_SETS_COUNT:
                return 0
        }
        return 0

    }

}



