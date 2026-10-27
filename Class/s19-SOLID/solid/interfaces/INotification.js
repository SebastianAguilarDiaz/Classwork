export class INotification{

    async send(recipient  , payload){
        throw new Error("Method 'send()' must be implemented in subclasses.")
    }
};