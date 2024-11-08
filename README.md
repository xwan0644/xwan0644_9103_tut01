# Major project
### xwan0644_9103_tut01_GroupD

###  *1.Instructions on interaction*

- Mouse click on the buttons in the upper left corner to play / pause the music
- Move the mouse left and right in the window to control the sound channel
- Move the mouse up and down in the window to control the volume level
> Volume and pan values can be seen in the upper right corner.



###  *2.Details of individual work*
1. Choice of animation
- Audio
2. Animation
- Four fixed rectangles slide and change size with volume level
- There are random colored squares generated and varied according to the distribution of the acoustic spectrum
- Colorful blocks on the line refresh to the rhythm of the music
>Differences from other group members：Whether it's a change in size or a slight movement or generating new random rectangles, it's all in tune with the musical rhythms of the boogie woogie.
3. References to inspiration

[Inspiration Video Link](https://www.youtube.com/watch?v=05KLW-xsoxE&t=2s
)

The video says that the small blocks of color in the painting are the left-handed playing portion of Boogie Woogie's piano performance, while the right-hand playing portion is the large block of color. So the original idea was to separate the left and right hand playing parts of the audio so that the large and small color blocks would follow the two parts separately. However, I was not successful in separating the left and right hand parts, so the final work was different from the original idea.

However, the large and small color blocks still change according to the different parameters of the music, allowing the static painting to change with the melody of the Boogie Woogie music. A randomly generated section has also been added to symbolize the randomness of the murmurs that appear in the environment while the music is being played.

4. A short technical explanation of code
- Changes to group codes

Split the function for randomly generating lines and squares into two, and call them in function setup() and draw() respectively to prevent them from being generated repeatedly in the loop.

- Individual code

Using p5.FFT object and amplitude analyzer to conduct an analysis on the audio signal frequency and the sound level. Obtaining values and combining them with values of elements from group work. Using if statements to determine audio-related numerical conditions to determine the frequency of refresh random generation.