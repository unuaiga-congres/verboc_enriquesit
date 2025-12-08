// Template/commonStyles.js
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({

    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top:'47%',
      zIndex: 9999,
    },
    main_container: {
      flex: 1,
      backgroundColor:'#f6f6f6',
      color:'#6e6e6e',
    },
    header_votz: {
      flexDirection: 'row',
      borderColor:'#6d29db',
      borderBottomWidth: 5,
      marginBottom: 5,
      paddingLeft: 7,
      paddingRight: 7,
      paddingTop: 2,
      paddingBottom: 2,
      justifyContent:'space-between',
      alignItems:'center',
    },
    header_title: {
      flexDirection: 'row',
    },
    header_text: {
      color: '#43168c',
      fontWeight: 'bold',
      fontSize:20,
      marginLeft:5,
    },
    logo_top: {
      width: 40,
      height: 40,
      marginBottom:5,
      marginTop:5,
    },
    menu_top: {
      width: 35,
      height: 35,
      marginBottom:5,
      marginTop:5,
    },
    menu_votz: {
      width: '15%',
      alignItems:'flex-end',
    },
    menu: {
      width: '100%',
      maxWidth:30,
      height: '100%',
      resizeMode: 'contain',
    },

    headmenu_picture: {
      width:35,
      height:35,
      tintColor: '#c5adeb',
  
    },
    headmenu_picture_active: {
      width:35,
      height:35,
      tintColor: '#ffffff',
  
    },
    
  
    search_form: {
      paddingTop: 10,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  
    page_votz: {
      paddingLeft: 7,
      paddingRight: 7,
      paddingTop: 10,
      flex:1,
      color: '#454545',
  
    },
    textinput: {
      width:'100%',
      marginTop:2,
      textAlignVertical:'top',
      color:'#454545',
      borderColor: '#43168c',
      borderWidth: 1,
      marginBottom: 5,
      paddingLeft:5,
      paddingRight:5,
      paddingTop:8,
      paddingBottom:3,
      backgroundColor:'#ffffff',
    },
    inputquizz: {
      marginTop:2,
      textAlignVertical:'top',
      color:'#454545',
      borderColor: '#6e6e6e',
      borderWidth: 1,
      marginBottom: 5,
      paddingLeft:5,
      paddingRight:5,
      paddingTop:8,
      paddingBottom:3,
      backgroundColor:'#ffffff',
      flex:1,
    },
    textcum: {
      fontWeight: 'bold',
      color:'#43168c',
      fontSize:16,
      marginTop:15,
    },
    suivicum: {
      fontWeight: 'bold',
      color:'#43168c',
      fontSize:18,
      marginBottom:15,
      textAlign:'center',
    },

    margintop: {
      marginTop:15,
    },
    listrep: {
      fontWeight: 'bold',
      color:'#43168c',
      fontSize:16,
    },
    buttons: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    button_votz: {
      backgroundColor:'#43168c',
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      borderRadius:5,
      borderColor: '#43168c',
      borderWidth: 2,
    },
    button_cercar: {
      flexGrow:1,
      height:39,
    },
    button_newsearch: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap:10,
    },
    button_rep: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      borderRadius:5,
      borderColor: '#43168c',
      borderWidth: 2,
      flexGrow:1,
      height:35,
      marginTop:15,
    },
    button_copy: {
      backgroundColor:'#43168c',
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#43168c',
      borderWidth: 2,
      marginLeft:5,
      color: '#ffffff',
      borderRadius:5,
      width:39,
      height:39,
    },
  
    copy: {
      width:18,
      height:18,
  
    },
    button_text: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    button_rep_text: {
      color:'#43168c',
      fontWeight: 'bold',
    },
  
    results: {
      flex:1,
  
    },
    allwidth: {
      width:'100%',
    },
  
    title_text: {
      fontSize:18,
      fontWeight: 'bold',
      color:'#43168c',
      marginBottom:8,
      marginTop:0,
      textAlign:'center',
      padding:3,
  
    },
    subtitle_text: {
      fontSize:18,
      fontWeight: 'bold',
      color:'#6e6e6e',
      marginBottom:8,
      marginTop:0,
      textAlign:'center',
      padding:3,
  
    },
  
    blocosca: {
      marginTop:20,
      backgroundColor:'#f6f6f6',
      zIndex:200,
    },
    ligneosca: {
      flexDirection:'row',
      alignItems:'center',
    },
    osca: {
      fontWeight: 'bold',
      color: '#454545',
      fontSize:18,
    },
    iconosca: {
      height:25,
      width:25,
      marginRight:7,
    },
  
    textrep: {
      fontWeight: 'bold',
      fontSize:16,
      color: '#454545',
    },
    textcum: {
      fontWeight: 'bold',
      color:'#43168c',
      fontSize:16,
      color: '#454545',
    },
    text: {
      color: '#454545',
    },
  
    text_error: {
      fontSize:15,
      marginTop:20,
      fontWeight:"bold",
      color: '#454545',
    },
  
    conj_container: {
      paddingBottom:40,
    },
    title_conj_inf: {
      textAlign: 'center',
      color: '#43168c',
      fontWeight: 'bold',
      fontSize:22,
      marginTop:8,
    },
    title_conj_times: {
      textAlign: 'left',
      color: '#43168c',
      fontWeight: 'bold',
      fontSize:18,
      marginTop:8,
    },
    conj_list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
  
    },
    conj_item: {
      borderColor: '#454545',
      padding: 5,
      marginTop: 8,
      marginBottom: 8,
      width:'48%',
      borderColor: '#bcbcbc',
      borderBottomWidth: 1,
      paddingBottom:1,
  
    },
    subtitle_conj: {
      textAlign: 'left',
      color: '#43168c',
      fontWeight: 'bold',
      marginBottom:10,
      fontSize:17,
    },
    subtitle_conj_grey: {
      textAlign: 'center',
      color: '#454545',
      fontSize:17,
    },

    blocsubtitle: {
      flexDirection: 'row',
      justifyContent: 'center',

    },

    bloctitlefav: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

    },
  
    fav_button: {
      backgroundColor:'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:5,
    },
  
    fav_picture: {
      width:25,
      height:25,
      tintColor: '#6d29db',
  
    },

    bloctornar: {
      position:'absolute',
      top: 10,
    },

    title_conj_fav: {
      textAlign: 'center',
      color: '#43168c',
      fontWeight: 'bold',
      fontSize:22,
    },

    title_conj: {
      textAlign: 'center',
      color: '#43168c',
      fontWeight: 'bold',
      fontSize:20,
      marginTop:8,
    },

    blocform: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: '#bcbcbc',
      borderTopWidth: 1,
      paddingTop:1,
    },

    button_listen: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:5,
      paddingTop:3,
      color: '#ffffff',
      borderRadius:5,
      width:20,
      height:20,
    },
    listen: {
      width:20,
      height:20,

    },


    text_conj: {
      color: '#454545',
      fontSize:16,
    },
    icon_go: {
      width:21,
      height:16,
    },
    itemdist: {
      color: '#454545',
      textAlign: 'center',
      fontWeight: 'bold',
      margin:8,
    },
    listItems: {
      marginTop:20,
    },
    listFrame: {
      marginTop:5,
    },
    itemmodel: {
      color: '#454545',
      fontSize:17,
    },
    idmodel: {
      fontWeight:"bold",
    },
    infmodel: {
      fontWeight:"bold",
      color: '#43168c',
    },
    descmodel: {
      fontSize:15,
      fontStyle:'italic',
    },
    contnv: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom:20,
      padding:0,
    },
    contpick: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom:20,
      padding:0,
    },
    centered: {
      alignItems: 'center',
      width:"100%",
      padding:0,
    },
    itemnv: {
      padding: 5,
      paddingTop:20,
      paddingBottom:20,
      borderRadius:5,
      borderWidth: 2,
      backgroundColor: '#6d29db',
      margin: 5,
      width:"30%",
      textAlign:"center",
    },
    questiontext: {
      color: '#ffffff',
      textAlign:"center",
  
    },

    neutral: {
      backgroundColor: '#6e6e6e',
      borderColor : "#393939",
  
    },
    right:{
      backgroundColor: '#049105',
      borderColor : "#004601",
    },
    wrong:{
      backgroundColor: '#940000',
      borderColor : "#600101",
    },
    good:{
      backgroundColor: '#629f63',
      borderColor : "#393939",
    },
    respCum: {
      padding:5,
    },
    changeLanguage: {
      padding:5,
    },
    cadreparam: {
      padding:5,
      backgroundColor: '#c5adeb',
      borderTopLeftRadius:5,
      borderTopRightRadius:5,
    },
    pickerlabel: {
      flexDirection: 'row',
      width:'100%',
      borderColor: '#43168c',
      borderWidth: 1,
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
      marginTop: 5,
      color:'#454545',
      alignItems:'center',
      backgroundColor:'#ffffff',
    },
    pickerlanguage: {
      height: 30,
      width:'68%',
      color:'#454545',
      margin:-10,
      transform: [
         { scaleX: 0.9 },
         { scaleY: 0.9 },
      ]
    },
    textpicker: {
      color: '#454545',
      width:'30%',
    },
    
    bottom: {
      backgroundColor:'#6d29db',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding:7,
      paddingLeft:15,
      paddingRight:15,
    },
    logobox: {
      flex: 1,
      padding: 5,
    },
    logo_bottom: {
      width: 200,
      height: 44,
      resizeMode: 'contain'
    },
    menu: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor:'#43168c',
      padding: 20,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: -2, height: 0 },
      shadowRadius: 5,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    closeText: {
      fontSize: 30,
    },
    menuLink: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems:'center',
      gap:12,
    },
    menuIcon: {
      width: 20,
      height: 20,
    },
    menuText: {
      fontSize: 20,
      color: '#ffffff',
    },
    menuSubLink: {
      marginTop: 10,
      paddingLeft: 30,
      flexDirection: 'row',
      alignItems:'center',
      gap:12,
    },
    menuSubText: {
      fontSize: 18,
      color: '#ffffff',
    },
    button: {
      marginTop: 30,
      backgroundColor: '#0088ff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
    },
    overlay: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    barreparam: {
      flexDirection:'row',
      marginBottom:7,
      marginTop:7,
      width:'100%',
      justifyContent:'space-between',
    },
    iconsparam: {
      flexDirection:'row',
      justifyContent:'start',
      gap:10,

    },
    buttonparam: {
      width:25,
      height:25,
      tintColor: '#6d29db',
    },
    help_text: {
      color:'#43168c',
      fontSize:16,
    },


});

export default commonStyles;