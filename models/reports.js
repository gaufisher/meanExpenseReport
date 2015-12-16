var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// require('./projects');
// require('./users');

var ReportSchema = new mongoose.Schema({
    name: String,
    items: [
        {
            type: {type: String},
            value: {type: Currency}
        }
    ],
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false},
/*    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    Uncomment project and user when they are linked properly */
    status: {
                type: String,
                validate: {
                    validator: function(v) {
                        return /saved|submitted|approved|denied/.test(v);
                    },
                    message: "{VALUE} is incorrect, needs to be: 'saved, submitted, approved, denied'"
                }
            }
});

mongoose.model('Report', ReportSchema);
