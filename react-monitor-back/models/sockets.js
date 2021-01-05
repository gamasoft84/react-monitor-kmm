

class Sockets {

    constructor( io ) {

        this.io = io;

        // Crear la instancia de nuestro ticketlist
       // this.ticketList = new TicketList();

        this.socketEvents();
        
    }

    socketEvents() {
        // On connection
        this.io.on( 'connection', ( socket ) => {

           console.log('cliente conectado');

           socket.on( 'solicitar-ticket' , (data, callback) => {
                const nuevoTicket = null;//this.ticketList.crearTicket();
                callback( nuevoTicket );
           });

           socket.on( 'siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {

                const suTicket = null//this.ticketList.asignarTicket( agente, escritorio ); 
                callback( suTicket );

                this.io.emit( 'ticket-asignado', null);//this.ticketList.ultimos13 );
           })
            
        
        });
    }


}


module.exports = Sockets;