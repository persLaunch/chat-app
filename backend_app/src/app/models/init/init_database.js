module.exports = {


    init: (db) => {

        // Create a Default Chatroom
        db.Chatroom.findOne().then((obj) => {
            if (!obj) { 
                return db.Chatroom.create({ title: 'Default Chatroom' });
            }

            return null;
        });

    },
};
