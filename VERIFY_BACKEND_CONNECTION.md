# Verifying Backend Data Connection

This document helps verify that the frontend is properly fetching and displaying backend data.

## Quick Test Steps

1. **Start both servers:**
   ```bash
   # In Hotel_Booking_System directory
   npm run dev:all
   # OR use start-both.bat / start-both.ps1
   ```

2. **Open browser console** (F12) to see data logs

3. **Test each endpoint:**

### Test 1: Rooms Listing
- Navigate to: http://localhost:3001/rooms
- **Expected in console:**
  - "Loading rooms from backend..."
  - "Fetched rooms from backend: X rooms"
  - "Sample room data: {...}"
- **Expected on screen:**
  - List of room cards with room numbers, types, prices
  - No "Failed to load rooms" error

### Test 2: Room Detail
- Click "View Details" on any room
- **Expected in console:**
  - "Loading room details for ID: X"
  - "Room data loaded: {...}"
- **Expected on screen:**
  - Room number, type, price, amenities displayed
  - Booking form visible

### Test 3: Check Backend Response Format
- Open Network tab in browser DevTools
- Look for GET request to `/api/rooms`
- **Expected response structure:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "room_number": "101",
        "room_type": "Standard",
        "base_rate": 89.99,
        "features": {...},
        "created_at": "..."
      }
    ],
    "count": 15
  }
  ```

## Common Issues & Fixes

### Issue: "Failed to load rooms"
**Check:**
1. Backend is running on port 3000
2. `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
3. CORS is enabled on backend (if needed)
4. Database has sample data (run `npm run migrate`)

### Issue: Rooms show but no data
**Check:**
1. Browser console for API response
2. Network tab shows 200 status
3. Response has `data` array with room objects

### Issue: Room ID mismatch
**Fix:** The frontend now handles both `id` (from view) and `room_id` (from procedure) automatically.

## Data Flow Verification

1. **Backend → API Client:**
   - Backend returns: `{ success: true, data: [...] }`
   - API wrapper extracts: `response.data.data`

2. **API Client → Component:**
   - Component receives: `Room[]` array
   - Component maps: `rooms.map(room => <RoomCard room={room} />)`

3. **Component → Display:**
   - RoomCard displays: `room.room_number`, `room.room_type`, `room.base_rate`, etc.

## Debugging Tips

- Check browser console for all API calls
- Check Network tab for actual HTTP requests/responses
- Verify backend logs show requests are received
- Use React DevTools to inspect component state
- Add `console.log` in components to see data flow

## Expected Data Structure

### Room Object (from backend):
```typescript
{
  id: number,              // From api_room_catalog_vu
  room_number: string,
  room_type: string,
  base_rate: number,
  features: {
    beds?: number,
    bed_type?: string,
    has_wifi?: boolean,
    max_occupancy?: number,
    // ... other features
  },
  created_at: string
}
```

### Room Object (from read_room procedure):
```typescript
{
  room_id: number,         // From stored procedure
  room_number: string,
  room_type: string,
  base_rate: number,
  features: {...},
  is_active: boolean,
  created_at: string,
  updated_at: string
}
```

The frontend now handles both formats automatically!

