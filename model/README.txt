How do you run the model on images you give it? 

python detect.py --weights /path/to/your/weights/best.pt --source /path/to/your/validation/images --save-txt --project /path/to/output/labels_folder --classes 0 --name experiment_name 

What Each Option Means:
--weights: The file path to your trained model weights (e.g., best.pt)  -----> model/dentai_yolov5s/weights
--source: The directory path where your input images (e.g., validation images) are located.
--save-txt: A flag that tells the script to save the detection results as text files.
--project: The directory path where the output (the generated label files) will be saved.
--name: The name of the experiment; this creates a subfolder under the project folder to keep the outputs organized.

Replace the paths with actual ones on your machine, and run the command in your terminal to get the model to label your images.

Model stats (for reference): 
Class      Images   Instances   P       R       mAP50   mAP50-95: 100%
all        141      578         0.779   0.814   0.819   0.547
caries     141      107         0.920   0.983   0.973   0.649
impacted   141      471         0.639   0.695   0.665   0.444

The model runs for both caries and impacted but we are only focusing on caries. But because we are running with --classes 0 it will only display the caries and ignore the impacted. 
