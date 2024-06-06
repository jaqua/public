
import React, {useState} from 'react';
import { View, Text, TextInput,StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import {perfusors, immediateCare, doses, calculateDosis, getTubusData} from "@jaqua/emergency"

const CalculationScreen: React.FC = () => {
    const [text, setText] = useState('');
    const [perfusorsResult, setPerfusorsResult] = useState<[] | any>(null);
    const [emergencyResult, setEmergencyResult] = useState<[] | any>(null);
    const [careResult, setCareResult] = useState<[] | any>(null);
    const [incubation, setIncubation] =useState<[] | any>(null);
    
    const handleTextChange = (text: any) => {
        setText(text);
        
        const weightInKg = parseFloat(text);
        

        if (!isNaN(weightInKg)) {
            const incubationResult = getTubusData(weightInKg);
            setIncubation(incubationResult)
          const result = perfusors.map((perfusor) =>
            calculateDosis('perfusoren', weightInKg, perfusor)
          );
        
          const care_result = immediateCare.map((item) =>
            calculateDosis('erstversorgung', weightInKg, item)
          );
        
          const dose_result = doses.map((item) =>
            calculateDosis('notfallmedikamente', weightInKg, item)
          );
        
          setPerfusorsResult(result);
          setCareResult(care_result);
          setEmergencyResult(dose_result);
        } else {
            setPerfusorsResult(null);
            setCareResult(null);
            setEmergencyResult(null);
            setIncubation(null);
        }
      };

    
    return (
      <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput
        style={styles.input} 
        placeholder="Weight"
        value={text}
        onChangeText={handleTextChange}
      />
    </View> 
  
      <ScrollView style={styles.perfusor_container}>
       {/* Incubation Data */}
       {incubation!==null? 
       <>
        <View style={styles.card}>
        <Text style={styles.heading}>Incubation </Text>  
          <Text style={styles.detail}>Tubusgröße: {incubation.size} </Text>
          <Text style={styles.detail}>
          Tubustiefe oral:  {incubation.oral} cm
          </Text>
          <Text style={styles.detail}>Tubustiefe nasal:  {incubation.nasal} cm</Text>
        </View>
       </>
    : null   
    }
       {/* Emergency Medication */}
       <View style={styles.card}>
      <Text style={styles.heading}>Notfallmedikamente ({text} Kg) </Text>
      {doses.map((perfusor, index) => (
        <View key={index} >
          <Text style={styles.title}>{perfusor.wirkstoff}</Text>
          <Text style={styles.detail}>
            {perfusor.ampulleDosis} {perfusor.ampulleEinheit} / {perfusor.ampulleMenge} ml
          </Text>
        
          {perfusor.doses.map((dose, doseIndex) => (
            <View key={doseIndex} style={styles.dose}>    
             
             {emergencyResult !=null? 
              <>
             <Text style={styles.doseDetail}>
             Dosierung: {emergencyResult[index].dosis} = {emergencyResult[index].dosisPerKg}
             </Text>
             <Text style={styles.doseDetail}>    
              {emergencyResult[index].quantity} 
             </Text>
             </>
             : 
             <Text style={styles.doseDetail}>     
             Dosierung: {dose.dosis} {dose.einheit}/ {dose.proKg ? 'kg' : ''}  {dose.verabreichung}
             </Text>
        }
            </View>
          ))} 
        </View>
      ))}
</View>
        {/* Immediate Care First Aid*/}
        <View style={styles.card}>
      <Text style={styles.heading}>Erstversorgung ({text} Kg)</Text>
      {immediateCare.map((perfusor, index) => (
        <View key={index}>
          <Text style={styles.title}>{perfusor.wirkstoff}</Text>
          <Text style={styles.detail}>
            {perfusor.ampulleDosis} {perfusor.ampulleEinheit} / {perfusor.ampulleMenge} ml
          </Text>
        
          {perfusor.doses.map((dose, doseIndex) => (
            <View key={doseIndex} style={styles.dose}>
            
            {careResult !=null? 
              <>
             <Text style={styles.doseDetail}>
             Dosierung: {careResult[index].dosis} 
             </Text>
             <Text style={styles.doseDetail}>    
              {careResult[index].quantity} 
             </Text>
             </>
             : 
             <Text style={styles.doseDetail}>
              Dosierung: {dose.dosis} {dose.einheit}/ {dose.proKg ? 'kg' : ''} / {dose.verabreichung =='i.t.' ? 'it' : 'iv'}
              </Text>
        }
                
            </View>
          ))} 
        </View>
      ))}
</View>
  {/* Perfusor */}
     <View style={styles.card}>
      <Text style={styles.heading}>Perfusoren ({text} Kg)</Text>
      {perfusors.map((perfusor, index) => (
        <View key={index}>
          <Text style={styles.title}>{perfusor.wirkstoff}</Text>
          <Text style={styles.detail}>
            {perfusor.ampulleDosis} {perfusor.ampulleEinheit} / {perfusor.ampulleMenge} ml
          </Text>
        
          {perfusor.doses.map((dose, doseIndex) => (
            <View key={doseIndex} style={styles.dose}>
              {perfusorsResult !=null? 
              <>
             <Text style={styles.doseDetail}>
             Dosierung: {perfusorsResult[index].dosis} {perfusorsResult[index].quantity} 
             </Text>
             <Text style={styles.doseDetail}>    
             Laufrate: {perfusorsResult[index].dosisPerKg}
             </Text>
             </>
             : 
             <Text style={styles.doseDetail}>
             Dosierung: {dose.dosis} {dose.einheit}/ {dose.proKg ? 'kg' : ''} /{dose.perfusor}
             </Text>
        }
              
            </View>
          ))} 
        </View>
      ))}
    </View>

    <View style={styles.disclaimer_back}>
    <View>
        <Text style={styles.heading}>Legende / Hinweise</Text>
        <Text style={styles.legende_text}>⚠️ = Es existieren verschiedene Konzentrationen mit diesem Wirkstoff Applikationsformen: i.t. = intratracheal, i.v. = intravenös
        Verdünnung 1:5 = Einer von insgesamt fünf Teilen enthält Wirkstoff, d.h. ein Teil Wirkstoff und vier Teile Lösungsmittel
        Verdünnung 1:10 = Einer von insgesamt zehn Teilen enthält Wirkstoff, d.h. ein Teil Wirkstoff und neun Teile Lösungsmittel
        x mg ad 50 ml NaCl 0,9% = Wirkstoff wird mit NaCl 0,9 % auf insgesamt 50 ml Spritzeninhalt aufgezogen
        </Text>
    </View>

    <View style={styles.line}/>

    <Text style={styles.disclaimer_heading}>Haftungsausschluss / Disclaimer</Text>
    <Text style={styles.disclaimer_text}>Die Informationen dieser Seite sind nicht für Patienten, sondern ausschließlich für selbstverantwortlich handelnde Ärzte gedacht. Sie stellen somit keine Anleitung zur Selbstmedikation dar und können keinerlei Ersatz für eine ärztliche Beratung oder Behandlung sein.
        Die beschriebenen Informationen sind ausschließlich dafür gedacht, die Arbeit des Arztes zu unterstützen. Die Therapieempfehlungen dieser Seiten dürfen nicht ungeprüft umgesetzt werden, die Verantwortung für die Anwendung der Informationen bleibt bei dem behandelnden Arzt.
        Beachten Sie unbedingt die Gebrauchsinformationen der Hersteller bezüglich der Medikamente, da es gelegentlich Änderungen bei Anwendung, Dosierung, Nebenwirkungen, Gegenanzeigen und Wechselwirkungen gibt.
    </Text>
    <Text style={styles.disclaimer_text}> Version 3.7.3</Text>
    </View>
</ScrollView>

   
    </View>
  </>
    );
}  



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: '#DCDCDC',
    },
   
    heading: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02,
        fontWeight: '600',
    },
 
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height * 0.07,
    },
    input: {
       height: 50,
      borderColor: '#000',
      borderWidth: 1,
      paddingHorizontal: 8,
      borderRadius: 5,
      width: '80%',
      marginBottom: Dimensions.get('window').height * 0.01,
    },
    
    legende_text: {
        fontSize: 12,
        marginBottom: Dimensions.get('window').height * 0.02,
    },
   
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#808080',
      },

      disclaimer_heading:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: Dimensions.get('window').height * 0.01,
        color: '#B0B0B0',
        marginTop: Dimensions.get('window').height * 0.01,
      },
      disclaimer_text:{
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: Dimensions.get('window').height * 0.02,
        color: '#B0B0B0',
        marginTop: Dimensions.get('window').height * 0.01,
      },
      
    perfusor_container: {
        padding: 16,
        backgroundColor: '#DCDCDC',
      },
      card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: Dimensions.get('window').height * 0.03,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:Dimensions.get('window').height * 0.001,
        marginTop: Dimensions.get('window').height * 0.01,
      },
      disclaimer_back: {
        backgroundColor: '#DCDCDC',
      },
      detail: {
        fontSize: 14,
        marginBottom: Dimensions.get('window').height * 0.003,
      },
      dose: {
        marginTop: Dimensions.get('window').height * 0.015,
        padding: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
      },
      doseDetail: {
        fontSize: 12,
      },
      
  });
  export default CalculationScreen;