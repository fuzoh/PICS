# Annex

**The question :**
The client wants to add a new property to his pictures to describe the weather.

## View

In the view we have differents possibilities :

* **Add a classic input field :** Just type keywords to describe the weather.
* **Add a field like tags :** The user can add differents separated keywords to describe the weather.
* **Add a select field :** The field displays pre-defined weather values, we can select one.

## Implementation

Description for the **first solution** :

1.  Display the new field in the component that display the metas fields :  
Here we create a new input field and just link it to a new `weather`property in the picture datas.
```html
<!-- PicsMetas.vue -->
<h4>Weather :</h4>
<el-input
  placeholder="Describe the weather"
  v-model="pics.weather"/>
```

2. Implement the new property in the persistent store :  
For this we just have to add this new property in the base template that describe all the pictures properties.
```js
// metaDatas.js (line 67)
let newPicsMetas = {
  // .... all the current datas
  weather: ''
}
```

For example, if we want to implement the second solution (tags style) : We just have to use the `el-tag` component instead of an `el-input`. And just change the type of the weather property in the store to an array.

## Search implementation
Now, if we want to able this property in the search. It's nessesary to add new conditions in the search method `dadabase.searchPics()`, to check if the weather property contains the needle.

Also, it's possible to simply add a new filter in the navbar to refine the search just on weather keywords.