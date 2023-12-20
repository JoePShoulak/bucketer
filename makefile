build: Bucketer.mcaddon

run: 
	regolith run

Bucketer.mcaddon:
	regolith apply-filter export
	mkdir ./packs/data;
