var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ReportSchema = new mongoose.Schema({
    name: String,
    items: [
        {
            type: {
                type: String
            },
            value: {
                type: Currency
            }
        }
    ],
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receipts: [
        {
            name: String,
            imgPath: String,
      			type: String,
      			dataString: String
        }
    ],
    status: {
                type: String,
                validate: {
                    validator: function(v) {
                        return /saved|submitted|approved|denied/.test(v);
                    },
                    message: "{VALUE} is incorrect, needs to be: 'saved, submitted, approved, denied'"
                }
            },
    notes: String,
    unsubmitReasons: [{date:{type: Date, default: Date.now},notes:String}],
    rejections: [
        {
            reason: {
                type: String,
                validator: function(v) {
                    return (v !== null && v !== undefined && v !== "");
                }
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

mongoose.model('Report', ReportSchema);
