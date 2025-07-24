import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

const useMentorStore=create()(
    devtools((set)=>({
        mentorsData:[],
        setMentorsData:(mentors)=>set(()=>({mentorsData:mentors}))
    }))
)

export default useMentorStore;