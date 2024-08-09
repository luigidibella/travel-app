import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    value: [
      {
        id: 0,
        title: "Tokyo",
        isVisited: true,
        description: "Tokio è la capitale del Giappone, una metropoli vibrante e moderna che mescola grattacieli futuristici con templi storici. È un importante centro economico, culturale e tecnologico.",
        imgURL: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 1,
        title: "Parigi",
        isVisited: false,
        description: "Parigi, la capitale della Francia, è famosa per la sua architettura iconica, come la Torre Eiffel e il Louvre. La città è un centro di arte, moda e cultura con una vibrante vita notturna e cucina raffinata.",
        imgURL: "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2,
        title: "New York",
        isVisited: true,
        description: "New York City, conosciuta come la Grande Mela, è un vibrante melting pot di culture. Con i suoi iconici grattacieli, Times Square e Central Park, è un centro globale di finanza, arte e intrattenimento.",
        imgURL: "https://images.unsplash.com/photo-1516893842880-5d8aada7ac05?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 3,
        title: "Roma",
        isVisited: true,
        description: "Roma, la capitale d'Italia, è un vero museo a cielo aperto con antiche rovine, come il Colosseo e il Foro Romano. La città è un crogiolo di storia, arte e cultura, con una cucina eccezionale e vivace vita cittadina.",
        imgURL: "https://images.unsplash.com/photo-1645649644176-275e96b2af7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 4,
        title: "Sydney",
        isVisited: false,
        description: "Sydney, una delle città più iconiche dell'Australia, è nota per la sua iconica Opera House e il Harbour Bridge. Con le sue splendide spiagge e un clima mite, è un centro vivace di cultura, gastronomia e attività all'aperto.",
        imgURL: "https://images.unsplash.com/photo-1585719475530-a3c546426d9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDZ8MTE1MjExOTN8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 5,
        title: "Città del Capo",
        isVisited: false,
        description: "Città del Capo, situata in Sudafrica, è celebre per la sua bellezza naturale, con il maestoso Table Mountain e splendide spiagge. La città è anche un vivace centro culturale con una ricca storia e una cucina variegata.",
        imgURL: "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload
      )
    },
  },
})

export const { add } = citiesSlice.actions

export const citiesReducer = citiesSlice.reducer