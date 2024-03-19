# Mood Based Music Recommendation System using Facial Emoton Model 

This project is the development of a prototype model of a cutting-edge Music Recommendation System.
The project unfolds through distinct phases, each contributing to the overall functionality and user experience:

**1. Data Collection and Extraction:** 
  Utilizes the **FER-2013 datset** for face images and leveraging the **Spotify Web API**, the system aggregates a diverse array of musical tracks.
   
**2. Data Cleaning and Preprocessing:**

  | FER Data Preprocessing | Description | 
  | ------------- | ------------- |
  | Data Reduction | Reducing to interested emotions|
  | Image Conversion | Converting image to raw pixel values |
  | Data Upsampling | Upsampling the minority class |
  | Data Reshaping | Reshaping data to one dimension |
  | Data Preparation | Extracting input and target variables |
  | Data Splits | Splitting the data for training and testing |
  | Data Normalization | Scaling down the values of data |

  | Song Data Preprocessing | Description |
  | ------------- | ------------- |
  | Drop Duplicates |Dropping the duplicate data |
  | Data Normalization | Scaling down the numeric features |
  | Genre Clustering | Identifying the genre of a track |
  | Data Storing | Storing the data into database |

**3. Model Building:**
  At the core a sophisticated recommendation model that incorporates state-of-the-art techniques. The process involves the utilization of a custom Convolutional Neural Network (CNN) model, referred to as **FERNET**, for precise emotion classification.

**4. Model Optimization:**
  Rigorous testing and validation of the emotion classification model guarantee its accuracy and reliability ensuring robust and dependable performance with the **Accuracy = 96%**.

**5. Application Development:**
  The culmination of the project results in the creation of the **Mood-Music App**, which seamlessly integrates the FER module, Emotion Recognition module, and Songs Recommendation module. This user-friendly application harnesses the power of real-time emotion analysis to provide a personalized and immersive music discovery experience.


# Mood-music-app...

This is an Application which consists of three different modules. 

**FER Module** is a video streaming module that gets the user data from a webcam.

**Emotion Recognition** predicts the binary class of the universal emotios such as happy or sad by inputting a user face image and the Fernet classifies the output.

**Songs Recommendation** yeilds the songs that are relevant to the genre classified such as sombre or cheerful according to the emotions classified.

This app tries to personalize the song recommendations by taking the user facial emotions into account.
