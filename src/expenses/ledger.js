import * as fs from 'fs';
import 'dotenv/config';

class Ledger{
    static collection = {}

    static add(user_id, expense){
        if(!this.collection[user_id])this.collection[user_id]=[];
        let bag = this.collection[user_id]
        bag.push(expense)
    }

    static save() {
        try {
            fs.writeFileSync(process.env.DATA_FILE_EXPENSES, JSON.stringify(this.collection));
            return true;
        } catch (err) {
            return false;
        }
    }

    static addAndSave(usertoAdd, expenseToAdd){
        Ledger.add(usertoAdd, expenseToAdd);
        Ledger.save();
    }

    static load() {
        try {
            this.collection = fs.readFileSync(process.env.DATA_FILE_EXPENSES);
            return true;
        } catch (err) {
            return false;
        }
    }
}

export {Ledger}