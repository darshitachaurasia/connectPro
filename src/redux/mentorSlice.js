import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "mock_mentors";

const saveMentorsToLocal = (mentors) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mentors));
};

const getMentorsFromLocal = () => {
  const mentors = localStorage.getItem(LOCAL_STORAGE_KEY);
  return mentors ? JSON.parse(mentors) : [];
};

const seedMentors = () => {
  const existing = getMentorsFromLocal();
  if (existing.length === 0) {
    const mockMentors = [
      {
        id: "m1",
        name: "Dr. Neha Sharma",
        service: "AI & Machine Learning",
        email: "neha@mentorshub.com",
        bio: "4.8 star rating",
      },
      {
        id: "m2",
        name: "Mr. Raj Patel",
        service: "Web Development",
        email: "raj@mentorshub.com",
        bio: "4.6 star rating",
      },
      {
        id: "m3",
        name: "Ms. Ayesha Khan",
        service: "Data Analytics",
        email: "ayesha@mentorshub.com",
        bio: "4.7 star rating",
      },
    ];
    saveMentorsToLocal(mockMentors);
    return mockMentors;
  }
  return existing;
};

export const fetchMentors = createAsyncThunk("mentor/fetchAll", async () => {
  return seedMentors();
});

export const updateMentor = createAsyncThunk(
  "mentor/update",
  async (updatedMentor) => {
    const currentMentors = getMentorsFromLocal();
    const updatedList = currentMentors.map((mentor) =>
      mentor.id === updatedMentor.id ? updatedMentor : mentor
    );
    saveMentorsToLocal(updatedList);
    return updatedMentor;
  }
);

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateMentor.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((m) => m.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      });
  },
});

export default mentorSlice.reducer;
