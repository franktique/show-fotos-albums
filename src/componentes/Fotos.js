import React  from 'react';
import { Container,Row, Col} from 'react-bootstrap';
import metodos from '../api/metodos';
import {Card} from 'primereact/card';


class Fotos extends React.Component {
    //static contextType = MiContextoProvider;

    constructor(props) {

        super(props);
        this.state = {data:null};

        this.getAlbums = this.getAlbums.bind(this);
        this.getCards = this.getCards.bind(this);
    
    }

    componentDidMount(){

        metodos.getListadoFotos()
        .then(res => { 

            //filtrar por ciertos id de album especificos
            let albumsFiltrados = res.filter(function(d){
                                    //console.log(d)
                                    return (d.albumId == 98 || d.albumId == 99 || d.albumId == 100) 
                                 });

            //console.log(albumsFiltrados);

            //agrupar por id de album
            let arrayFotosFinal = [];
            let currentId = null;
            let record;

            albumsFiltrados.forEach((d,i)=>{

                
                if (d.albumId !== currentId) {
                    
                    if(currentId) arrayFotosFinal.push(record);

                    currentId=d.albumId;
                    //console.log()
                    record = {id:currentId, fotos:[]}

                }

                record.fotos.push(d);
                    
            })

            //inserte el ultimo
            arrayFotosFinal.push(record);

            //filtrar las ultimas tres fotos
            arrayFotosFinal.forEach(function(d){

                let count = d.fotos.length -3;
                d.fotos= d.fotos.filter(function(d,i){
                    return i >= count;
                })
                
            })
            
            //console.log(arrayFotosFinal);
                        
            this.setState({data:arrayFotosFinal});
        });

    }

    getAlbums(){

        let rows= this.state.data.map((row, i)=>{

            let fotos = this.getCards(row.fotos);

            let miClaseBorde;

            if (row.id==98) miClaseBorde= "D98";
            if (row.id==99) miClaseBorde= "D99";
            if (row.id==100) miClaseBorde= "D100";
        
            return  <Row className={miClaseBorde} >{fotos}</Row>
        });

        return rows;

    }

    getCards(unFotos){


        

        let rows= unFotos.map((row, i)=>{

            let miHeader = (
                <div style={{backgroundColor:'#f4f4f4', height:'25px', color:'#333333'}}
                >{row.title}</div>
            );
        
            return  <Col xs={4} style={{paddingTop:'30px'}}>
                        <Card  header={miHeader}>
                            <img className='fotoImagen' src={row.thumbnailUrl} style={{ width: '30%', height: '30%'}}/>
                        </Card>
                    </Col>
        });

        return rows;

    }



    render() { 
        
        console.log(this.state.data);

        if(this.state.data) {

            let Albumes = this.getAlbums();

            return (

                <Container fluid>
                    {Albumes}        
                </Container>
              );
        }        
        else {
            return (

                <Container fluid>
                    Cargando datos de las fotos..
            
                </Container>
              );
        }
        
    }
}


export default Fotos;